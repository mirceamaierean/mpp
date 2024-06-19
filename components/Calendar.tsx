"use client";
import Calendar from "@ericz1803/react-google-calendar";

let calendars = [
  {
    calendarId: process.env.NEXT_PUBLIC_CALENDAR_ID,
    color: "#085456",
  },
];

export default function GoogleCalendar() {
  return (
    <div className="max-w-7xl mx-auto pt-20">
      <Calendar
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API}
        calendars={calendars}
        showArrow={true}
      />
    </div>
  );
}
