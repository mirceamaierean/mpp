"use client";

import PaymentForm from "./PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/utils/stripe";
export interface PaymentFormProps {
  amount: number;
  startDate: string;
  endDate: string;
  carId: number;
}

export default function ElementsWrapperStripe({
  amount,
  startDate,
  endDate,
  carId,
}: PaymentFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm
        amount={amount}
        startDate={startDate}
        endDate={endDate}
        carId={carId}
      />
    </Elements>
  );
}
