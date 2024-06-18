"use client";

import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  createPaymentIntent,
  getLatestCharge,
} from "@/service/PaymentsService";
import { PaymentFormProps } from "./ElementsWrapperStripe";
import { addRentalToDB } from "@/service/RentalsService";
import { toast } from "react-toastify";

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
  hidePostalCode: true,
};

export default function PaymentForm({
  amount,
  startDate,
  endDate,
  car,
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cardElement = elements?.getElement(CardElement);
    setIsLoading(true);

    if (!stripe || !cardElement) {
      return;
    }

    const data = await createPaymentIntent(amount);
    const clientSecret = data.clientSecret;

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: "mirciu",
            },
          },
        },
      );

      if (error) {
        console.error(error);
        toast.error("Payment failed", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else if (paymentIntent) {
        const { receipt_url } = await getLatestCharge(paymentIntent.id);

        const res = await addRentalToDB({
          carid: car.id,
          value: amount,
          startdate: startDate,
          enddate: endDate,
          paymentid: paymentIntent.id,
          receiptUrl: receipt_url,
        });

        if (res.status === 400) {
          console.error("Failed to add rental");
          toast.error("Failed to add rental! Contact administrator", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setIsLoading(false);
          return;
        }

        toast.success(
          "Payment successful! You can see you receipt in your profile section",
          {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          },
        );
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <div className="flex flex-col">
          <div className="p-4 border-r border-gray-200 ">
            <h1 className="text-2xl font-bold mb-4">Total Amount: €{amount}</h1>
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
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md flex items-center w-full text-center justify-center hover:bg-secondary transition duration-200"
                disabled={isLoading}
              >
                {(isLoading && (
                  <>
                    Processing Payment...
                    <svg
                      className="animate-spin ml-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                  </>
                )) ||
                  "Pay"}
              </button>{" "}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
