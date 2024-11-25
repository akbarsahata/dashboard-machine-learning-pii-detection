import { ResponseTab } from "@/components/responses-tab/response-tab";
import { SearchInput } from "@/components/search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDetectionResults } from "@/lib/db";

export default async function DashboardPage(props: {
  searchParams: Promise<{ q: string; offset: string; tab: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? "";
  const offset = searchParams.offset ?? 0;
  const tab = searchParams.tab ?? "all";

  const { results, newOffset, totalResults } = await getDetectionResults(
    search,
    Number(offset),
  );

  return (
    <div className="flex flex-col max-w-screen-xl min-w-[1280px] mx-auto p-6">
      <div className="flex flex-col gap-2 py-4 align-center justify-start">
        <h1 className="text-2xl font-extrabold">
          Dashboard Monitoring Response API
        </h1>
        <span className="text-muted-foreground">
          Manage your API in this dashboard.
        </span>
      </div>
      <Tabs defaultValue={tab}>
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="warning">Warning</TabsTrigger>
            <TabsTrigger value="critical">Critical</TabsTrigger>
            <TabsTrigger value="pass">Pass</TabsTrigger>
          </TabsList>
          <SearchInput />
        </div>

        <TabsContent value="all">
          <ResponseTab
            results={results}
            offset={newOffset ?? 5}
            totalResults={totalResults}
          />
        </TabsContent>
        <TabsContent value="warning">
          <ResponseTab
            results={results.filter((r) => r.severity === "Warning")}
            offset={newOffset ?? 5}
            totalResults={totalResults}
          />
        </TabsContent>
        <TabsContent value="critical">
          <ResponseTab
            results={results.filter((r) => r.severity === "Critical")}
            offset={newOffset ?? 5}
            totalResults={totalResults}
          />
        </TabsContent>
        <TabsContent value="pass">
          <ResponseTab
            results={results.filter((r) => r.severity === "Pass")}
            offset={newOffset ?? 5}
            totalResults={totalResults}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
