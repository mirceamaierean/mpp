"use client";
import React from "react";
import { useState, useEffect } from "react";
import ElementsWrapperStripe from "./ElementsWrapperStripe";
import RentalDateRange from "./RentalDateRange";
import { Car } from "@/types/types";

interface RentalFormProps {
  car: Car;
  startDateSearch: string;
  endDateSearch: string;
}

export default function RentalForm({
  car,
  startDateSearch,
  endDateSearch,
}: RentalFormProps) {
  const [startDate, setStartDate] = useState<string>(startDateSearch);
  const [endDate, setEndDate] = useState<string>(endDateSearch);
  const [amount, setAmount] = useState<number>(0);

  const price = car.price || 0;

  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = end.getTime() - start.getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    setAmount(days * price);
  }, [startDate, endDate, price]);

  return (
    <div>
      <RentalDateRange
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <ElementsWrapperStripe
        amount={amount}
        startDate={startDate}
        endDate={endDate}
        car={car}
      />
    </div>
  );
}
