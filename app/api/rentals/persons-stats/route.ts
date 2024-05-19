import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { skip, length } = await req.json();
  const data = await prisma.rentals.groupBy({
    by: ["userid"],
    _count: {
      _all: true,
    },
    skip: skip,
    take: length,
    orderBy: {
      _count: {
        userid: "desc",
      },
    },
  });

  // Fetch the persons for each group
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: data.map((group) => group.userid) as string[],
      },
    },
  });

  const result = data.map((group) => ({
    ...group,
    user: users.find((user) => user.id === group.userid),
  }));

  return new NextResponse(JSON.stringify(result, null, 2));
}
