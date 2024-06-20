import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  // get all cars that have a location
  const cars = await prisma.cars.findMany({
    where: {
      latitude: {
        not: null,
      },
      longitude: {
        not: null,
      },
    },
    select: {
      make: true,
      model: true,
      latitude: true,
      longitude: true,
    },
  });

  return new NextResponse(JSON.stringify(cars));
}
