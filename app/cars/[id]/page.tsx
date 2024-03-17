"use client";

import { useCarStore } from "@/store/zustand";
import { notFound } from "next/navigation";
import UpdateCarModal from "@/components/UpdateCar";

export default function Page({ params }: { params: { id: number } }) {
  const cars = useCarStore((state) => state.cars);

  const car = cars.find((car) => car.id == params.id);

  if (!car) return notFound();

  return UpdateCarModal({ carId: car.id });
}
