import "server-only";

import { MongoClient } from "mongodb";
import { z } from "zod";

const client = new MongoClient(process.env.MONGO_URI!);
const db = client.db("logs");
const detectionResultsCollection = db.collection("detection_results");

export const detectionResultSchema = z.object({
  model: z.enum(["svm", "naive_bayes"]),
  endpoint: z.string(),
  authorization: z.boolean(),
  predict: z.number(),
  severity: z.enum(["Pass", "Warning", "Critical"]),
  response: z.string(),
});

export type DetectionResult = z.infer<typeof detectionResultSchema>;

export async function getDetectionResults(
  search: string,
  offset: number,
): Promise<{
  results: DetectionResult[];
  newOffset: number | null;
  totalResults: number;
}> {
  if (search) {
    const [results, totalResults] = await Promise.all([
      detectionResultsCollection
        .find({ name: { $regex: search, $options: "i" } })
        .limit(1000)
        .toArray(),
      detectionResultsCollection.countDocuments({
        name: { $regex: search, $options: "i" },
      }),
    ]);

    console.log("getDetectionResults", results, totalResults);

    return {
      results: results.map((r) =>
        detectionResultSchema.parse({
          ...r,
          response: JSON.stringify(r.response),
        }),
      ),
      newOffset: null,
      totalResults,
    };
  }

  if (offset === null) {
    return { results: [], newOffset: null, totalResults: 0 };
  }

  const [results, totalResults] = await Promise.all([
    detectionResultsCollection.find().skip(offset).limit(5).toArray(),
    detectionResultsCollection.countDocuments(),
  ]);

  console.log("getDetectionResults", results, totalResults);

  const newOffset = results.length >= 5 ? offset + 5 : null;

  return {
    results: results.map((r) =>
      detectionResultSchema.parse({
        ...r,
        response: JSON.stringify(r.response),
      }),
    ),
    newOffset,
    totalResults,
  };
}
