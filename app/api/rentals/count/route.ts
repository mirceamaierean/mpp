import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const data = await prisma.rentals.count();
  return new NextResponse(JSON.stringify(data, null, 2));
}
