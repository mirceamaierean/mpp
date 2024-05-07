import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  const { data } = await req.json();
  try {
    const car = await prisma.cars.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!car) return new NextResponse(null, { status: 404 });
  } catch (error) {
    return new NextResponse(null, { status: 404 });
  }
  const res = await prisma.cars.update({
    where: {
      id: data.id,
    },
    data,
  });

  return new NextResponse(JSON.stringify(res, null, 2));
}
