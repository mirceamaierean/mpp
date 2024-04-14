import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = createClient();

  const { data } = await req.json();

  const res = await supabase.from("rentals").insert(data).select();

  if (res.error) {
    console.error("Failed to add rental to DB", res.error.message);
    return new NextResponse("Failed to add rental to DB", { status: 500 });
  }

  return new NextResponse(JSON.stringify(res.data[0].id), { status: 200 });
}
