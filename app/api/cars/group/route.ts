import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  let { column } = await req.json();

  // get all the cars, group them by the column, and count the number of cars in each group
  const cars = await prisma.cars.groupBy({
    by: [column],
    _count: {
      _all: true,
    },
    where: {
      NOT: {
        [column]: null,
      },
    },
  });

  cars.forEach((car: any) => {
    car["label"] = car[column];
    car["value"] = car["_count"]["_all"];
    delete car["_count"];
    delete car[column];
  });

  return new NextResponse(JSON.stringify(cars, null, 2));
}
