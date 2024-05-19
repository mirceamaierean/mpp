import { redirect } from "next/navigation";
import CarInfo from "@/components/CarInfo";
import RentalsTable from "@/components/RentalsTable";
import { getCurrentUser } from "@/lib/session";

export default async function Page({ params }: { params: { id: number } }) {
  const user = await getCurrentUser();
  if (!user) return redirect("/login");

  return (
    <>
      <CarInfo carId={params.id} />
      <RentalsTable carId={params.id} userEmail={user.email as string} />;
    </>
  );
}
