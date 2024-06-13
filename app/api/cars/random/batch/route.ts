import { NextResponse } from "next/server";
import { faker } from "@faker-js/faker";
import prisma from "@/lib/prisma";
import { getRandomTransmissions } from "@/utils/functions";
import { getRandomDriveTypes } from "@/utils/functions";
import { isUserAdmin } from "@/lib/session";

export async function POST() {
  const isAdmin = await isUserAdmin();
  if (!isAdmin) {
    return new NextResponse(null, { status: 401 });
  }
  for (let i = 0; i < 1000; ++i) {
    const randomMake = faker.vehicle.manufacturer();
    const randomModel = faker.vehicle.model();
    const randomYear = Math.floor(Math.random() * (2024 - 1950 + 1)) + 1950;
    const randomColor = faker.vehicle.color();
    const randomFuel = faker.vehicle.fuel();
    const randomBodyType = faker.vehicle.type();
    const randomTransmission = getRandomTransmissions();
    const randomDriveType = getRandomDriveTypes();

    const data = {
      make: randomMake,
      model: randomModel,
      year: randomYear,
      color: randomColor,
      body: randomBodyType,
      fueltype: randomFuel,
      transmission: randomTransmission,
      drivetype: randomDriveType,
    };

    try {
      await prisma.cars.create({ data: data });
    } catch (e) {
      console.error("error for index");
      return new NextResponse("Error while creating response", { status: 500 });
    }
  }

  return new NextResponse("ok", { status: 200 });
}
