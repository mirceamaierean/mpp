import { NextRequest, NextResponse } from "next/server";

import io from "socket.io-client";

const PORT = process.env.NEXT_PUBLIC_SOCKETS_PORT || 3033;
const socket = io("http://localhost:" + PORT);

export async function POST(req: NextRequest) {
  try {
    socket.emit("message1", "Sync Process Completed");
    return NextResponse.json({ data: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
