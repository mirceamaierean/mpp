import { NextRequest } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return new Response(null, { status: 400 });
  }

  try {
    // Use the resources method to list all images in the specified folder
    const result = await cloudinary.v2.api.resources({
      type: "upload",
      prefix: `cars/${id}/`, // Adjust the prefix to match your folder structure
      max_results: 500, // Optional: Adjust based on your needs
    });

    // Extract URLs from the response
    const urls = result.resources.map((resource: any) => resource.url);

    return new Response(JSON.stringify(urls, null, 2), {
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
