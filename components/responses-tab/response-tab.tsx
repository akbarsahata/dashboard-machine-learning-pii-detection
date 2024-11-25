"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { DetectionResult } from "@/lib/db";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { ResponseHeader, ResponseRow } from "./table-rows";

export function ResponseTab({
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
        <Table>
          <TableHeader>
            <ResponseHeader />
          </TableHeader>
          <TableBody>
            {results.map((r) => (
              <ResponseRow
                endpoint={r.endpoint}
                severity={r.severity}
                id={r.id}
              />
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
