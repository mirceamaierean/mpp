import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = createClient();

  const { carId } = await req.json();

  if (!carId) {
    return new NextResponse("Missing carId", { status: 400 });
  }

  // get all rentals for the car
  const { data: rentals } = await supabase
    .from("rentals")
    .select()
    .eq("carId", carId);

  return new NextResponse(JSON.stringify(rentals, null, 2));
}
