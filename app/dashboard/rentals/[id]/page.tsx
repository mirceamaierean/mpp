"use client";
import { notFound } from "next/navigation";
import UpdateRentalModal from "@/components/UpdateRental";
import { getRentalById } from "@/service/RentalsApi";
import { useEffect, useState } from "react";
import { Rental } from "@/types/types";

export default function Page({ params }: { params: { id: number } }) {
  const [rental, setRental] = useState<Rental | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRental = async () => {
      const rentalWithId = await getRentalById(params.id);
      setRental(rentalWithId);
      setLoading(false);
    };

    getRental();
  });

  if (loading) return <div>Loading...</div>;
  if (!rental) return notFound();

  return (
    <>
      <UpdateRentalModal rental={rental} />
    </>
  );
}
