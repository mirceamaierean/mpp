import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  let { id } = await req.json();

  // parseInt is used to convert the string to a number
  id = parseInt(id);

  const car = await prisma.cars.findUnique({
    where: {
      id: id,
    },
  });

  if (!car) return new NextResponse(null, { status: 404 });

  return new NextResponse(JSON.stringify(car, null, 2));
}
