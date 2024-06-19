import { NextRequest } from "next/server";
import { chromium } from "playwright";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return new Response("No url provided", { status: 400 });
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let success = false;
  for (let attempts = 0; attempts < 5; attempts++) {
    try {
      await page.goto(url, { waitUntil: "load" });
      success = true;
      break;
    } catch (e) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  if (!success) {
    await browser.close();
    return new Response("Failed to load the page", { status: 500 });
  }

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${encodeURIComponent(url)}.pdf"`,
    },
  });
}
