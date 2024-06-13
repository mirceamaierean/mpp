import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isUserAdmin } from "@/lib/session";

export async function DELETE(req: NextRequest) {
  const isAdmin = await isUserAdmin();
  if (!isAdmin) {
    return new NextResponse(null, { status: 401 });
  }

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
