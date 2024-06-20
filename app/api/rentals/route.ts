import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createPool } from "@vercel/postgres";

const pool = createPool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req: NextRequest) {
  const { id } = await req.json();

  const data = await prisma.rentals.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!data) {
    return new NextResponse(null, { status: 404 });
  }
  return new NextResponse(JSON.stringify(data, null, 2));
}

export async function GET(req: NextRequest) {
  const skip = req.nextUrl.searchParams.get("skip");
  const length = req.nextUrl.searchParams.get("length");
  const column = req.nextUrl.searchParams.get("column");
  const direction = req.nextUrl.searchParams.get("direction");

  if (!skip || !length || !column || !direction) {
    return new NextResponse(null, { status: 400 });
  }

  const { rows: rentals } = await pool.query(
    `SELECT r.*, c.make, c.model FROM "Rentals" r
    JOIN "cars" c ON r."carid" = c.id
    ORDER BY ${column} ${direction}
    OFFSET $1 LIMIT $2`,
    [skip, length],
  );

  return new NextResponse(JSON.stringify(rentals), {
    headers: {
      "content-type": "application/json",
    },
    status: 200,
  });
}
