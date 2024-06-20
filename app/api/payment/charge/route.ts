import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

export async function GET(req: NextRequest) {
  const paymentId = req.nextUrl.searchParams.get("paymentId");

  if (!paymentId) {
    return new NextResponse(null, {
      status: 400,
    });
  }
  let latest_charge: string;
  try {
    const payment = await stripe.paymentIntents.retrieve(paymentId);
    if (payment.latest_charge) latest_charge = payment.latest_charge as string;
    else
      return new NextResponse(JSON.stringify({ error: "No charge found" }), {
        status: 404,
      });
    const charge = await stripe.charges.retrieve(latest_charge);
    return new NextResponse(JSON.stringify(charge, null, 2));
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}
