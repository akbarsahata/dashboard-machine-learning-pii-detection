"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DetectionResult } from "@/lib/db";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { SearchInput } from "../search";
import { match } from "ts-pattern";

export function PassResponseTab({
  results,
  offset,
  totalResults,
}: {
  results: DetectionResult[];
  offset: number;
  totalResults: number;
}) {
  const router = useRouter();
  const resultsPerPage = 5;

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/?offset=${offset}`, { scroll: false });
  }

  return (
    <Card className="mx-auto max-w-screen-2xl">
      <CardContent>
        <div className="flex flex-row-reverse">
          <SearchInput />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Endpoint</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Response</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((r) => (
              <TableRow key={r.endpoint}>
                <TableCell className="font-medium">{r.endpoint}</TableCell>
                <TableCell>
                  {match(r.severity)
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
                    .with("Critical", () => (
                      <Badge variant="destructive">Critical</Badge>
                    ))
                    .exhaustive()}
                </TableCell>
                <TableCell>{r.response}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <strong>
              {Math.max(0, Math.min(offset - resultsPerPage, totalResults) + 1)}
              -{offset}
            </strong>{" "}
            of <strong>{totalResults}</strong> API
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === resultsPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + resultsPerPage > totalResults}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
