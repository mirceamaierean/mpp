import CarsTable from "@/components/CarsTable";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CarsTable />
    </Suspense>
  );
}
