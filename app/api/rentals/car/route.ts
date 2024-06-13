import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  let { skip, length, column, direction, carId, userEmail } = await req.json();

  if (!carId) {
    return new NextResponse("Missing carId", { status: 400 });
  }

  if (!userEmail) {
    return new NextResponse("Missing userEmail", { status: 400 });
  }

  // get the user id
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  carId = parseInt(carId);

  // get all rentals for the car
  const rentals = await prisma.rentals.findMany({
    skip: skip,
    take: length,
    orderBy: {
      [column]: direction,
    },
    where: {
      carid: carId,
      userid: user.id,
    },
  });

  return new NextResponse(JSON.stringify(rentals, null, 2));
}
