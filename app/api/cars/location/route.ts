import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const key = process.env.GOOGLE_GEOCODING_API;

  if (!id) {
    return new NextResponse(JSON.stringify({ error: "No id provided" }), {
      status: 400,
    });
  }

  const car = await prisma.cars.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!car?.latitude || !car?.longitude) {
    return new NextResponse(
      JSON.stringify({ error: "No location data found" }),
      {
        status: 404,
      },
    );
  }

  const latlng = `${car.latitude},${car.longitude}`;

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${key}`,
  );

  if (res.status === 400) {
    const error = await res.json();
    return error;
  }

  const { results } = await res.json();
  if (results.length === 0) {
    return new NextResponse(JSON.stringify({ error: "No results found" }), {
      status: 404,
    });
  }

  const formattedAddress = results[0].formatted_address;

  return new NextResponse(JSON.stringify({ formattedAddress }));
}
