import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { id } = await req.json();

  const data = await prisma.rentals.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!data) {
    return new NextResponse(null, { status: 404 });
  }
  return new NextResponse(JSON.stringify(data, null, 2));
}
