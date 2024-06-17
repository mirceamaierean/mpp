"use client";

import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "@/service/PaymentsService";
import Button from "@mui/material/Button";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      letterSpacing: "0.025em",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
  hidePostalCode: true, // Add this line to hide the postal code field
};

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cardElement = elements?.getElement(CardElement);

    if (!stripe || !cardElement) {
      return;
    }

    const data = await createPaymentIntent(1000);
    const clientSecret = data.clientSecret;

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: "Mihai Costel",
            },
          },
        },
      );

      if (error) {
        console.error(error);
      } else if (paymentIntent) {
        console.log(paymentIntent);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 border-r border-gray-200">
            <h2 className="text-xl font-bold mb-4">Payment Information</h2>
            <p className="text-gray-600">
              Please enter your card details on the right to proceed with the
              payment.
            </p>
          </div>
          <div className="p-4">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Card Details</span>
                </label>
                <div className="p-2 border border-gray-300 rounded">
                  <CardElement options={CARD_ELEMENT_OPTIONS} />
                </div>
              </div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="w-full"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
