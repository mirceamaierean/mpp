"use client";
import { notFound } from "next/navigation";
import UpdateCarModal from "@/components/UpdateCar";
import { getCarById } from "@/service/CarsService";
import { useEffect, useState } from "react";
import { Car } from "@/types/types";

export default function Page({ params }: { params: { id: number } }) {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCar = async () => {
      const carWithId = await getCarById(params.id);
      if (carWithId) setCar(carWithId);
      setLoading(false);
    };

    getCar();
  });

  if (loading) return <div>Loading...</div>;
  if (!car) return notFound();

  return (
    <>
      <UpdateCarModal car={car} />
    </>
  );
}
