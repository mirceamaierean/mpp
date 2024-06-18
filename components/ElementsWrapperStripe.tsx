"use client";

import PaymentForm from "./PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/utils/stripe";
import { Car } from "@/types/types";
export interface PaymentFormProps {
  amount: number;
  startDate: string;
  endDate: string;
  car: Car;
}

export default function ElementsWrapperStripe({
  amount,
  startDate,
  endDate,
  car,
}: PaymentFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm
        amount={amount}
        startDate={startDate}
        endDate={endDate}
        car={car}
      />
    </Elements>
  );
}
