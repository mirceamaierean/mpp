import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { faker } from '@faker-js/faker';

export async function POST(req: NextRequest) {
  const randomMake = faker.vehicle.manufacturer();
  const randomModel = faker.vehicle.model();
  const randomYear = Math.floor(Math.random() * (2024 - 1950 + 1)) + 1950;
  const randomColor = faker.vehicle.color();
  const randomFuel = faker.vehicle.fuel();
  const randomBodyType = faker.vehicle.type();

  const supabase = createClient();

  const data = {
    make: randomMake,
    model: randomModel,
    year: randomYear,
    color: randomColor,
    body: randomBodyType,
    fuelType: randomFuel,
  };

  const res = await supabase.from("cars").insert(data).select();

  await fetch("http://localhost:3000/api/sockets", { method: "POST" });

  if (res.error) {
    console.error("Failed to add car to DB", res.error.message);
    return new NextResponse("Failed to add car to DB", { status: 500 });
  }
  return new NextResponse(JSON.stringify(res.data[0].id), { status: 200 });
}