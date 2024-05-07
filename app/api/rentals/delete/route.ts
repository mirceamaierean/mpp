import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  const { data } = await req.json();
  // delete all rentals that are have the id in data

  try {
    await prisma.rentals.deleteMany({
      where: {
        id: data.id,
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(null, { status: 404 });
  }

  return new NextResponse("Successfully removed rentals from db", {
    status: 200,
  });
}
