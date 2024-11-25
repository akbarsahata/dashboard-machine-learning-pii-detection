import "server-only";

import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI!);
const db = client.db("logs");
const detectionResultsCollection = db.collection("detection_results");

export type DetectionResult = {
  model: string;
  endpoint: string;
  authorization: boolean;
  predict: number;
  severity: string;
  response: string; // Ensure response is a string
};

export async function getDetectionResults(
  search: string,
  offset: number,
): Promise<{
  results: any[];
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

    return {
      results: results.map((product) => ({
        endpoint: product.endpoint,
        severity: product.severity,
        response: JSON.stringify(product.response),
      })),
      newOffset: null,
      totalResults,
    };
  }

  if (offset === null) {
    return { results: [], newOffset: null, totalResults: 0 };
  }

  const totalProducts = await detectionResultsCollection.countDocuments();
  const moreProducts = await detectionResultsCollection
    .find()
    .skip(offset)
    .limit(5)
    .toArray();
    
  const newOffset = moreProducts.length >= 5 ? offset + 5 : null;

  return {
    results: moreProducts.map((product) => ({
      endpoint: product.endpoint,
      severity: product.severity,
      response: JSON.stringify(product.response),
    })),
    newOffset,
    totalResults: totalProducts,
  };
}
