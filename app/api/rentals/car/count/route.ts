import { NextRequest, NextResponse } from "next/server";
import { createPool } from "@vercel/postgres";

const pool = createPool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req: NextRequest) {
  const carId = req.nextUrl.searchParams.get("carId");
  if (!carId) {
    return new NextResponse(JSON.stringify({ error: "No car id provided" }), {
      status: 400,
    });
  }
  const { rows: rentals } = await pool.query(
    `
    SELECT COUNT(*) FROM "Rentals"
    WHERE carid = $1
  `,
    [carId]
  );
  return new NextResponse(JSON.stringify(rentals[0]), {
    headers: {
      "content-type": "application/json",
    },
    status: 200,
  });
}
