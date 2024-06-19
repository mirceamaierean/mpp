import { NextRequest } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return new Response("No url provided", { status: 400 });
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle0" });
  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
  });
  await browser.close();

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${url}.pdf`,
    },
  });
}
