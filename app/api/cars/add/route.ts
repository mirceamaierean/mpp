import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = createClient();

  const { data } = await req.json();

  const res = await supabase.from("cars").insert(data).select();

  if (res.error) {
    console.error("Failed to add car to DB", res.error.message);
    return new NextResponse("Failed to add car to DB", { status: 500 });
  }

  console.log(res);

  // return the id of the car that was added
  return new NextResponse(JSON.stringify(res.data[0].id), { status: 200 });
}
