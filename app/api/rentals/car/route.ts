import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  let { skip, length, column, direction, carId } = await req.json();

  if (!carId) {
    return new NextResponse("Missing carId", { status: 400 });
  }

  carId = parseInt(carId);

  // get all rentals for the car
  const rentals = await prisma.rentals.findMany({
    skip: skip,
    take: length,
    orderBy: {
      [column]: direction,
    },
    where: {
      carid: carId,
    },
  });

  console.log("rentals");

  return new NextResponse(JSON.stringify(rentals, null, 2));
}
