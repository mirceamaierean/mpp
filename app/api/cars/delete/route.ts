import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function DELETE(req: NextRequest) {
  const supabase = createClient();

  const { data } = await req.json();

  for (const carId of data) {
    const res = await supabase.from("cars").delete().match({ id: carId });
    if (res.error) {
      console.error("Failed to delete with id: " + carId, res.error.message);
    }
  }
  return new NextResponse("Successfully added car to DB", { status: 200 });
}
