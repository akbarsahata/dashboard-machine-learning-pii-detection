import { TableCell, TableRow } from "@/components/ui/table";
import { DetectionResult } from "@/lib/db";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { match } from "ts-pattern";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export function ResponseRow({
  endpoint,
  severity,
  id,
}: {
  id: string;
  endpoint: string;
  severity: DetectionResult["severity"];
}) {
  return (
    <TableRow key={endpoint}>
      <TableCell className="font-medium">{endpoint}</TableCell>
      <TableCell>
        {match(severity)
          .with("Pass", () => (
            <Badge
              variant="outline"
              className="bg-green-500 hover:bg-green-500/80 text-white"
            >
              Pass
            </Badge>
          ))
          .with("Warning", () => (
            <Badge
              variant="secondary"
              className="bg-yellow-500 hover:bg-yellow-500/80 text-white"
            >
              Warning
            </Badge>
          ))
          .with("Critical", () => <Badge variant="destructive">Critical</Badge>)
          .exhaustive()}
      </TableCell>
      <TableCell>
        <Button asChild type="button" variant={"link"}>
          <Link href={`/detection-results/${id}`}>
            See Details
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
}

export function ResponseHeader() {
  return (
    <TableRow>
      <TableCell>Endpoint</TableCell>
      <TableCell>Severity</TableCell>
      <TableCell>Response</TableCell>
    </TableRow>
  );
}
