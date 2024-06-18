import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import * as mindee from "mindee";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get("photo");

  if (file && file instanceof File) {
    const filePath = path.join(process.cwd(), "uploads", file.name);

    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    const writeStream = fs.createWriteStream(filePath);

    const reader = file.stream().getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        writeStream.write(value);
      }
    } finally {
      writeStream.end();

      await new Promise((resolve) => writeStream.on("finish", resolve));

      const mindeeClient = new mindee.Client({
        apiKey: process.env.MINDEE_API_KEY!,
      });

      const inputSource = mindeeClient.docFromPath(filePath);

      const apiResponse = mindeeClient.parse(
        mindee.product.eu.DriverLicenseV1,
        inputSource,
      );
      const result = await apiResponse;

      return new NextResponse(
        JSON.stringify(result.document.inference.prediction),
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 200,
        },
      );
    }
  }
  return new NextResponse(JSON.stringify("No file uploaded"), { status: 400 });
}
