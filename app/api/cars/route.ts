import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = createClient();

  const { data: cars } = await supabase.from("cars").select();

  return new NextResponse(JSON.stringify(cars, null, 2));
}

export async function POST(req: NextRequest) {
  const supabase = createClient();

  const { id } = await req.json();

  const { data: car } = await supabase.from("cars").select().eq("id", id);

  if (!car || car.length == 0) return new NextResponse(null, { status: 404 });


  return new NextResponse(JSON.stringify(car, null, 2));
}
