import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { skip, length } = await req.json();
  const data = await prisma.rentals.groupBy({
    by: ["personid"],
    _count: {
      _all: true,
    },
    skip: skip,
    take: length,
    orderBy: {
      _count: {
        personid: "desc",
      },
    },
  });

  // Fetch the persons for each group
  const persons = await prisma.persons.findMany({
    where: {
      id: {
        in: data.map((group) => group.personid) as number[],
      },
    },
  });

  const result = data.map((group) => ({
    ...group,
    person: persons.find((person) => person.id === group.personid),
  }));

  return new NextResponse(JSON.stringify(result, null, 2));
}
