import CarsTable from "@/components/CarsTable";
import { isUserAdmin } from "@/lib/session";
import { Suspense } from "react";

export default async function Home() {
  const isAdmin = await isUserAdmin();
  if (!isAdmin)
    return <div>Oops! This page is only for the administrators!</div>;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CarsTable />
    </Suspense>
  );
}
