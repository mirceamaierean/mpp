"use client";

import PaymentForm from "./PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/utils/stripe";

export default function ElementsWrapperStripe() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}
