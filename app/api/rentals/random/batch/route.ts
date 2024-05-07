import { NextResponse } from "next/server";
import { faker } from "@faker-js/faker";
import prisma from "@/lib/prisma";

export async function POST() {
  console.log("POST /api/contract/random/batch");

  // extract from req the starting id and the ending id
  let startingId = 0;

  const carsCount = await prisma.cars.count();
  const personsCount = await prisma.persons.count();
  // get the last person that does not have any rental
  for (let i = 1; i <= personsCount; ++i) {
    const rentalsCount = await prisma.rentals.count({
      where: {
        personid: i,
      },
    });
    if (rentalsCount === 0) {
      startingId = i;
      break;
    }
  }
  console.log("startingId", startingId);
  if (startingId) {
    console.log("person", startingId);
    for (let j = 0; j < 10000; ++j) {
      const carId = Math.floor(Math.random() * carsCount) + 1;
      // generate 2 date, the start date and the end date
      // the start date must be before the end date
      const startDate = faker.date.recent();
      const endDate = faker.date.future();
      const value = Math.floor(Math.random() * 1000) + 1;

      const data = {
        carid: carId,
        personid: startingId,
        startdate: startDate,
        enddate: endDate,
        value: value,
      };

      try {
        await prisma.rentals.create({ data: data });
      } catch (e) {
        console.error("error for index", e);
        return new NextResponse("Error while creating response", {
          status: 500,
        });
      }
    }
  }

  return new NextResponse("ok", { status: 200 });
}
