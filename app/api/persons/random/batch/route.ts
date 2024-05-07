import { NextResponse } from "next/server";
import { faker } from "@faker-js/faker";
import prisma from "@/lib/prisma";

export async function POST() {
  console.log("POST /api/person/random/batch");

  for (let i = 0; i < 100000; ++i) {
    const randomSex = Math.random() < 0.5 ? "female" : "male";
    const randomFirstName = faker.person.firstName(randomSex);
    const randomLastName = faker.person.lastName(randomSex);
    const randomEmail = faker.internet.email({
      firstName: randomFirstName,
      lastName: randomLastName,
    });
    const randomPhone = faker.phone.number();
    const randomAddress = faker.location.street();
    const randomCity = faker.location.city();

    const data = {
      firstname: randomFirstName,
      lastname: randomLastName,
      email: randomEmail,
      phone: randomPhone,
      address: randomAddress,
      city: randomCity,
    };

    try {
      await prisma.persons.create({ data: data });
    } catch (e) {
      console.error("error for index", e);
    }
  }

  return new NextResponse("ok", { status: 200 });
}
