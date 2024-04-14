import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = createClient();

  const { data: rentals } = await supabase.from("rentals").select();

  return new NextResponse(JSON.stringify(rentals, null, 2));
}

export async function POST(req: NextRequest) {
  const supabase = createClient();

  const { id } = await req.json();

  const { data: rental } = await supabase.from("rentals").select().eq("id", id);

  if (!rental || rental.length == 0)
    return new NextResponse(null, { status: 404 });

  return new NextResponse(JSON.stringify(rental, null, 2));
}
