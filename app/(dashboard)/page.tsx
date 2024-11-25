import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDetectionResults } from "@/lib/db";
import { AllResponseTab } from "@/components/responses-tab/all-responses-tab";
import { WarningResponseTab } from "@/components/responses-tab/warning-responses-tab";
import { CriticalResponseTab } from "@/components/responses-tab/critical-responses-tab";
import { PassResponseTab } from "@/components/responses-tab/pass-responses-tab";

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
    <div className="flex flex-col max-w-screen-2xl mx-auto p-6">
      <div>
        <h1>Dashboard Monitoring Response API</h1>
        <span>Manage your API in this dashboard.</span>
      </div>
      <Tabs defaultValue={tab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="warning">Warning</TabsTrigger>
          <TabsTrigger value="critical">Critical</TabsTrigger>
          <TabsTrigger value="pass">Pass</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <AllResponseTab
            results={results}
            offset={newOffset ?? 5}
            totalResults={totalResults}
          />
        </TabsContent>
        <TabsContent value="warning">
          <WarningResponseTab
            results={results.filter((r) => r.severity === "Warning")}
            offset={newOffset ?? 5}
            totalResults={totalResults}
          />
        </TabsContent>
        <TabsContent value="critical">
          <CriticalResponseTab
            results={results.filter((r) => r.severity === "Critical")}
            offset={newOffset ?? 5}
            totalResults={totalResults}
          />
        </TabsContent>
        <TabsContent value="pass">
          <PassResponseTab
            results={results.filter((r) => r.severity === "Pass")}
            offset={newOffset ?? 5}
            totalResults={totalResults}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
