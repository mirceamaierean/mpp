import BasicTable from "@/components/Table";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BasicTable />
    </Suspense>
  );
}
