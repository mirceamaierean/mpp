import { NextRequest, NextResponse } from "next/server";
import { createPool } from "@vercel/postgres";

const pool = createPool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req: NextRequest) {
  let startDateAsString = req.nextUrl.searchParams.get("startDate");
  let endDateAsString = req.nextUrl.searchParams.get("endDate");

  if (!startDateAsString || !endDateAsString) {
    return new NextResponse(
      JSON.stringify({ message: "Please provide a start and end date" }),
      {
        status: 400,
      },
    );
  }

  const startDate = new Date(startDateAsString);
  const endDate = new Date(endDateAsString);

  const { rows: availableCars } = await pool.query(
    `
    SELECT * FROM cars
    WHERE id NOT IN (
      SELECT carid FROM "Rentals"
      WHERE startdate <= $1 AND enddate >= $1
      OR startdate <= $2 AND enddate >= $2
    )
  `,
    [startDate, endDate],
  );

  return new NextResponse(JSON.stringify(availableCars), {
    headers: {
      "content-type": "application/json",
    },
    status: 200,
  });
}
