import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { carId } = await req.json();
  const data = await prisma.rentals.count({
    where: {
      carid: parseInt(carId),
    },
  });
  return new NextResponse(JSON.stringify(data, null, 2));
}
