"use client";

import { notFound } from "next/navigation";
import UpdateCarModal from "@/components/UpdateCar";
import { getCarById } from "@/service/CarsApi";

export default function Page({ params }: { params: { id: number } }) {
  const getCar = async (id: number) => {
    const car = await getCarById(id);
    return car;
  };

  const car = getCar(params.id);

  if (!car) return notFound();

  return UpdateCarModal({ id: params.id });
}
