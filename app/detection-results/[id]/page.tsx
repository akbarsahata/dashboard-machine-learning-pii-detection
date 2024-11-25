import BackButton from "@/components/ui/back-button";
import { Badge } from "@/components/ui/badge";
import { getDetectionResultById } from "@/lib/db";
import { CheckCheckIcon, XCircleIcon } from "lucide-react";
import { match } from "ts-pattern";

export default async function DetectionResultPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const detectionResult = await getDetectionResultById(id);

  return (
    <div className="flex flex-col max-w-screen-xl min-w-[1280px] mx-auto p-6">
      <div className="flex flex-col gap-2 py-4 align-center justify-start">
        <h1 className="text-2xl font-extrabold">Detection Result</h1>
        <span className="text-muted-foreground">
          Manage your API in this dashboard.
        </span>
      </div>
      <BackButton />
      <div className="flex flex-col gap-2 py-4 align-center justify-start">
        <h1 className="text-xl font-extrabold">{detectionResult.endpoint}</h1>
        <span className="text-muted-foreground">
          {match(detectionResult.severity)
            .with("Pass", () => (
              <Badge
                variant="outline"
                className="bg-green-500 hover:bg-green-500/80 text-white text-sm"
              >
                Pass
              </Badge>
            ))
            .with("Warning", () => (
              <Badge
                variant="secondary"
                className="bg-yellow-500 hover:bg-yellow-500/80 text-white text-sm"
              >
                Warning
              </Badge>
            ))
            .with("Critical", () => (
              <Badge variant="destructive" className="text-sm">
                Critical
              </Badge>
            ))
            .exhaustive()}
        </span>
        <span>
          {detectionResult.authorization ? (
            <div className="flex gap-2 items-center">
              <CheckCheckIcon className="h-6 w-6 text-green-500" />
              <h2 className="text-lg font-bold">Has Authorization</h2>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <XCircleIcon className="h-6 w-6 text-red-500" />
              <h2 className="text-lg font-bold">Without Authorization</h2>
            </div>
          )}
        </span>
        <span className="text-muted-foreground">
          <pre>{detectionResult.response}</pre>
        </span>
      </div>
    </div>
  );
}
