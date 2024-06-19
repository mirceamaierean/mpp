"use client";
import React from "react";
import { useState, useEffect } from "react";
import ElementsWrapperStripe from "./ElementsWrapperStripe";
import RentalDateRange from "./RentalDateRange";
import { Car } from "@/types/types";
import { checkIfCarIsAvailable } from "@/service/RentalsService";

interface RentalFormProps {
  car: Car;
  startDateSearch: string;
  endDateSearch: string;
  errorMessage: string;
}

export default function RentalForm({
  car,
  startDateSearch,
  endDateSearch,
  errorMessage,
}: RentalFormProps) {
  const [error, setError] = useState<string>(errorMessage);
  const [startDate, setStartDate] = useState<string>(startDateSearch);
  const [endDate, setEndDate] = useState<string>(endDateSearch);
  const [amount, setAmount] = useState<number>(0);

  const price = car.price || 0;

  useEffect(() => {
    const checkAvailability = async (startDate: string, endDate: string) => {
      const { available } = await checkIfCarIsAvailable(
        car.id,
        startDate,
        endDate,
      );
      if (!available) {
        setError("Car is not available for the selected dates");
      } else {
        setError("");
      }
    };
    const start = new Date(startDate);
    const end = new Date(endDate);
    checkAvailability(startDate, endDate);
    const diff = end.getTime() - start.getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    setAmount(days * price);
  }, [startDate, endDate, price, car.id]);

  return (
    <div>
      <RentalDateRange
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      {error !== "" ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <ElementsWrapperStripe
          amount={amount}
          startDate={startDate}
          endDate={endDate}
          car={car}
        />
      )}
    </div>
  );
}
