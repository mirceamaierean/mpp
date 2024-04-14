import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function DELETE(req: NextRequest) {
  const supabase = createClient();

  const { data } = await req.json();

  for (const rentalId of data) {
    const res = await supabase.from("rentals").delete().match({ id: rentalId });
    if (res.error) {
      console.error("Failed to delete with id: " + rentalId, res.error.message);
    }
  }
  return new NextResponse("Successfully added rental to DB", { status: 200 });
}
