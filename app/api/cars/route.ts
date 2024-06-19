import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
import { createPool } from "@vercel/postgres";

const pool = createPool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req: NextRequest) {
  const skip = req.nextUrl.searchParams.get("skip");
  const length = req.nextUrl.searchParams.get("length");
  const column = req.nextUrl.searchParams.get("column");
  const direction = req.nextUrl.searchParams.get("direction");

  const { rows: cars } = await pool.query(
    `
    SELECT * FROM cars
    ORDER BY ${column} ${direction}
    OFFSET $1
    LIMIT $2
  `,
    [skip, length],
  );

  return new NextResponse(JSON.stringify(cars), {
    headers: {
      "content-type": "application/json",
    },
    status: 200,
  });
}
