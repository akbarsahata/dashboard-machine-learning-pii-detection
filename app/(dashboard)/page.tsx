import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDetectionResults } from "@/lib/db";
import { AllResponseTab } from "./all-responses-tab";

export default async function ProductsPage(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? "";
  const offset = searchParams.offset ?? 0;
  const {
    results: products,
    newOffset,
    totalResults: totalProducts,
  } = await getDetectionResults(search, Number(offset));

  return (
    <div className="flex flex-col max-w-screen-2xl mx-auto p-6">
      <div>
        <h1>Dashboard Monitoring Response API</h1>
        <span>Manage your API in this dashboard.</span>
      </div>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="warning">Warning</TabsTrigger>
          <TabsTrigger value="critical">Critical</TabsTrigger>
          <TabsTrigger value="pass">Pass</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <AllResponseTab
            results={products}
            offset={newOffset ?? 5}
            totalResults={totalProducts}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
