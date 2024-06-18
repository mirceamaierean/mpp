import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return new NextResponse(null, { status: 401 });
  }

  const { data } = await req.json();

  data.carid = parseInt(data.carid);
  data.startdate = new Date(data.startdate);
  data.enddate = new Date(data.enddate);

  try {
    await prisma.rentals.create({
      data: {
        value: data.value,
        startdate: data.startdate,
        enddate: data.enddate,
        paymentid: data.paymentid,
        receiptUrl: data.receiptUrl,
        User: {
          connect: {
            email: user.email as string,
          },
        },
        cars: {
          connect: {
            id: data.carid,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(null, { status: 404 });
  }

  return new NextResponse(JSON.stringify(data, null, 2));
}
