import AggregationsTable from "@/components/AggregationsTable";
import { Suspense } from "react";

export default function Aggregations() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AggregationsTable />
    </Suspense>
  );
}
