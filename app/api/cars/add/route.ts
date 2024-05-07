import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { data } = await req.json();

  const res = await prisma.cars.create({ data });

  return new NextResponse(JSON.stringify(res, null, 2));
}
