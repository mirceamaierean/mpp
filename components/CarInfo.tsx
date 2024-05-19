"use client";
import { getCarById } from "@/service/CarsApi";
import { Car } from "@/types/types";
import { Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface CarInfoProps {
  carId: number;
}

export default function CarInfo({ carId }: CarInfoProps) {
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    const getCar = async () => {
      const carWithId = await getCarById(carId);
      setCar(carWithId);
    };
    getCar();
  }, []);
  if (!car) return null;

  return (
    <div className="mt-4 max-w-6xl mx-auto">
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {car.make}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Model: {car.model}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Year: {car.year}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fuel Type: {car.fueltype}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Color: {car.color}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
