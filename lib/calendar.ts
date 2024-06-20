import { google } from "googleapis";
import { Rentals, cars } from "@prisma/client";

const credentials = JSON.parse(process.env.GOOGLE_API_KEY as string);

const gauth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

export async function addRentalToCalendar(rental: Rentals, car: cars) {
  const authClient = await gauth.getClient();
  const calendar = google.calendar({ version: "v3", auth: authClient as any });

  const calendarId = process.env.NEXT_PUBLIC_CALENDAR_ID as string;

  if (!rental.startdate || !rental.enddate) {
    throw new Error("Invalid rental dates");
  }
  const event = {
    summary: `Rental ${rental.id}: ${car.make} ${car.model}`,
    description: `Rental of ${car.make} ${car.model}`,
    start: {
      dateTime: rental.startdate.toISOString(),
      timeZone: "Europe/Bucharest",
    },
    end: {
      dateTime: rental.enddate.toISOString(),
      timeZone: "Europe/Bucharest",
    },
    notifications: [
      {
        method: "email",
        type: "eventCreation",
      },
    ],
  };

  await calendar.events.insert({
    calendarId,
    requestBody: event,
  });
}
