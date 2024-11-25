"use client";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DetectionResult } from "@/lib/db";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchInput } from "./search";

export function AllResponseTab({
  results,
  offset,
  totalResults,
}: {
  results: DetectionResult[];
  offset: number;
  totalResults: number;
}) {
  const router = useRouter();
  const productsPerPage = 5;

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
            {results.map((product) => (
              <TableRow>
                <TableCell className="font-medium">
                  {product.endpoint}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {product.severity}
                  </Badge>
                </TableCell>
                <TableCell>{product.response}</TableCell>
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
              {Math.max(
                0,
                Math.min(offset - productsPerPage, totalResults) + 1,
              )}
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
              disabled={offset === productsPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + productsPerPage > totalResults}
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
