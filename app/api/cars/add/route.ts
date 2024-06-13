import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isUserAdmin } from "@/lib/session";

export async function POST(req: NextRequest) {
  const isAdmin = await isUserAdmin();

  if (!isAdmin) {
    return new NextResponse(null, { status: 401 });
  }
  const { data } = await req.json();

  const res = await prisma.cars.create({ data });

  return new NextResponse(JSON.stringify(res, null, 2));
}
