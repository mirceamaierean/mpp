"use client";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { Car } from "@/types/types";
import { getCarById } from "@/service/CarsApi";
import CarInfo from "@/components/CarInfo";
import RentalsTable from "@/components/RentalsTable";

export default function Page({ params }: { params: { id: number } }) {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getCar = async () => {
      const carWithId = await getCarById(params.id);
      setCar(carWithId);
      setLoading(false);
    };
    getCar();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!loading && !car) return notFound();
  return (
    <>
      <CarInfo car={car} />
      <RentalsTable carId={params.id} />;
    </>
  );
}
