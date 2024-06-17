import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { amount } = data;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "RON",
    });

    return new NextResponse(
      JSON.stringify(
        {
          clientSecret: paymentIntent.client_secret,
        },
        null,
        2,
      ),
    );
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}
