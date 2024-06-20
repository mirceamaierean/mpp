import { NextRequest } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function GET(req: NextRequest) {
  const fileName = req.nextUrl.searchParams.get("fileName");
  if (!fileName) {
    return new Response(null, { status: 400 });
  }

  try {
    // get the image from cloudinary
    const result = await cloudinary.v2.api.resources({
      type: "upload",
      prefix: `licenses/${fileName}`,
    });

    // Extract URLs from the response
    const urls = result.resources.map((resource: any) => resource.url);

    if (urls.length === 0) {
      return new Response(JSON.stringify({ error: "No images found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ imagePath: urls[0] }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch images" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
