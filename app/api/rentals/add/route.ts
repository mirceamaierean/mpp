import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { compileRentalConfirmationTemplate, sendMail } from "@/lib/nodemailer";
import { addRentalToCalendar } from "@/lib/calendar";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return new NextResponse(null, { status: 401 });
  }

  const { data } = await req.json();

  data.carid = parseInt(data.carid);
  data.startdate = new Date(data.startdate);
  data.enddate = new Date(data.enddate);

  let rental;

  try {
    rental = await prisma.rentals.create({
      data: {
        value: data.value,
        startdate: data.startdate,
        enddate: data.enddate,
        paymentid: data.paymentid,
        receiptUrl: data.receiptUrl,
        city: data.city,
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

  const car = await prisma.cars.findUnique({
    where: {
      id: data.carid,
    },
  });

  if (!car) {
    return new NextResponse(null, { status: 404 });
  }

  const body = compileRentalConfirmationTemplate(
    user.name as string,
    data.value,
    data.startdate.toDateString(),
    data.enddate.toDateString(),
    car.make + " " + car.model,
    data.city,
  );

  await sendMail(user.email as string, "Rental Confirmation", body);

  try {
    await addRentalToCalendar(rental, car);
  } catch (error) {
    console.error("Failed to add rental to calendar", error);
  }

  return new NextResponse(JSON.stringify(data, null, 2));
}
