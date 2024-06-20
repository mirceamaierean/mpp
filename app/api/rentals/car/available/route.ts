import { NextRequest, NextResponse } from "next/server";
import { createPool } from "@vercel/postgres";

const pool = createPool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req: NextRequest) {
  const startDateString = req.nextUrl.searchParams.get("startDate");
  const endDateString = req.nextUrl.searchParams.get("endDate");
  const carId = req.nextUrl.searchParams.get("carId");

  if (
    startDateString === undefined ||
    endDateString === undefined ||
    carId === undefined
  ) {
    return new NextResponse(
      JSON.stringify({
        message: "Please provide a start and end date and a carId",
      }),
      {
        status: 400,
      },
    );
  }

  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  const { rows: rentals } = await pool.query(
    `
      SELECT EXISTS (
        SELECT 1 FROM "Rentals"
        WHERE carid = $1
          AND (
              startdate <= $2 AND enddate >= $2
              OR startdate <= $3 AND enddate >= $3
              OR $2 <= startdate AND $3 >= enddate
          )
      ) AS "exists"
    `,
    [carId, startDate, endDate],
  );

  const available = !rentals[0].exists;

  return new NextResponse(
    JSON.stringify({
      available,
    }),
    {
      headers: {
        "content-type": "application/json",
      },
    },
  );
}
