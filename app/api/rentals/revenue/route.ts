import { createPool } from "@vercel/postgres";
import { NextRequest } from "next/server";

const pool = createPool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req: NextRequest) {
  const startDateString = req.nextUrl.searchParams.get("startDate");
  const endDateString = req.nextUrl.searchParams.get("endDate");

  if (!startDateString || !endDateString) {
    return new Response("Missing start or end date", { status: 400 });
  }

  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  const client = await pool.connect();

  //   compute for each car the revenue for contracts that have the start date between the start and end date
  const result = await client.query(
    `
      SELECT
      cars.id,
      cars.make,
      cars.model,
      SUM(r.value) as revenue
      FROM
      "Rentals" as r
      JOIN
      cars
      ON
      r."carid" = cars.id
      WHERE
      r."startdate" >= $1 AND r."startdate" <= $2
      GROUP BY
      cars.id
    `,
    [startDate, endDate],
  );

  client.release();

  return new Response(JSON.stringify(result.rows, null, 2), {
    headers: {
      "content-type": "application/json",
    },
  });
}
