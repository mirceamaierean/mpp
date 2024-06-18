import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return new Response(null, { status: 400 });
  }

  const data = await prisma.rentals.findMany({
    where: {
      userid: id,
    },
    include: {
      cars: true,
    },
  });

  return new Response(JSON.stringify(data, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
}
