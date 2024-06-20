import { NextRequest } from "next/server";
import { createPool } from "@vercel/postgres";

const pool = createPool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req: NextRequest) {
  const upcoming = req.nextUrl.searchParams.get("upcoming");
  if (!upcoming) {
    return new Response("Missing 'upcoming' query parameter", {
      status: 400,
    });
  }
  if (upcoming !== "true" && upcoming !== "false") {
    return new Response("Invalid 'upcoming' query parameter", {
      status: 400,
    });
  }

  const client = await pool.connect();

  try {
    const res = await client.query(
      `SELECT r.*, c.make, c.model FROM "Rentals" r
        JOIN "cars" c ON r."carid" = c.id
      WHERE startdate ${upcoming === "true" ? ">" : "<"} NOW()
      `,
    );

    return new Response(JSON.stringify(res.rows), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal server error", { status: 500 });
  } finally {
    client.release();
  }
}
