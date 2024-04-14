import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function PATCH(req: NextRequest) {
  const supabase = createClient();

  const { data } = await req.json();

  const carId = data.id;

  delete data.id;

  const res = await supabase.from("cars").update(data).match({ id: carId });

  if (res.error) {
    console.error("Failed to update car to DB", res.error.message);
    return new NextResponse("Failed to update car to DB", { status: 400 });
  }

  return new NextResponse("Successfully updated car to DB", { status: 200 });
}
