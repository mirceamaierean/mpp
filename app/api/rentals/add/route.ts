import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return new NextResponse(null, { status: 401 });
  }

  // get the id of the user from db
  const userWithId = await prisma.user.findUnique({
    where: {
      email: user.email as string,
    },
  });

  if (!userWithId) {
    return new NextResponse(null, { status: 404 });
  }

  const id = userWithId.id;

  const { data } = await req.json();

  // Add the user id to the rental data
  data.carid = parseInt(data.carid);

  try {
    await prisma.rentals.create({
      data: {
        value: data.value,
        startdate: data.startdate,
        enddate: data.enddate,
        User: {
          connect: {
            id: id,
          },
        },
        cars: {
          connect: {
            id: data.carid,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(null, { status: 404 });
  }

  return new NextResponse(JSON.stringify(data, null, 2));
}
