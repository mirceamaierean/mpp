import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { data } = await req.json();

  try {
    await prisma.rentals.create({
      data,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(null, { status: 404 });
  }

  return new NextResponse(JSON.stringify(data, null, 2));
}
