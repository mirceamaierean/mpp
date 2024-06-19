"use client";

import PaymentForm from "./PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/utils/stripe";
import { Car } from "@/types/types";
export interface PaymentFormProps {
  amount: number;
  startDate: string;
  endDate: string;
  location: string;
  car: Car;
}

export default function ElementsWrapperStripe({
  amount,
  startDate,
  endDate,
  location,
  car,
}: PaymentFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm
        amount={amount}
        location={location}
        startDate={startDate}
        endDate={endDate}
        car={car}
      />
    </Elements>
  );
}
