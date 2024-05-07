import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  console.log("DELETE");
  const { data } = await req.json();

  try {
    const res = await prisma.cars.deleteMany({
      where: {
        id: {
          in: data,
        },
      },
    });
  } catch (error) {
    return new NextResponse(null, { status: 404 });
  }
  return new NextResponse(null, { status: 200 });
}
