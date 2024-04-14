import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function PATCH(req: NextRequest) {
  const supabase = createClient();

  const { data } = await req.json();

  const rentalId = data.id;

  delete data.id;

  const res = await supabase.from("rentals").update(data).match({ id: rentalId });

  if (res.error) {
    console.error("Failed to update rental to DB", res.error.message);
    return new NextResponse("Failed to update rental to DB", { status: 400 });
  }

  return new NextResponse("Successfully updated rental in DB", { status: 200 });
}
