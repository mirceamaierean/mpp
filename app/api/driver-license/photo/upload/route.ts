import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { getUser } from "@/lib/session";

export async function POST(req: NextRequest) {
  const user = await getUser();
  if (!user) {
    return new NextResponse(null, { status: 401 });
  }

  const data = await req.formData();
  const file = data.get("photo");

  if (file && file instanceof File) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const base64 = Buffer.from(buffer).toString("base64");

    const contentType = file.type || "application/octet-stream";
    const dataUrl = `data:${contentType};base64,${base64}`;

    const uploadResult = await cloudinary.v2.uploader.upload(dataUrl, {
      folder: "licenses",
      public_id: `${user.name}${user.id}`,
    });

    if (uploadResult.secure_url) {
      return new NextResponse(JSON.stringify(uploadResult.secure_url), {
        status: 200,
      });
    }
  }
  return new NextResponse(
    JSON.stringify("Failed to upload photo to cloudinary"),
    { status: 400 },
  );
}
