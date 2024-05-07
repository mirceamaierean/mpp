import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { skip, length, column, direction } = await req.json();

  // get all the cars, knowing the index of the first car and the length of the page
  const data = await prisma.cars.findMany({
    skip: skip,
    take: length,
    orderBy: {
      [column]: direction,
    },
  });

  if (!data) {
    return new NextResponse(null, { status: 404 });
  }

  return new NextResponse(JSON.stringify(data, null, 2));
}
