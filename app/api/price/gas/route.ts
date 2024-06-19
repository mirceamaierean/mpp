// #nume_locatie

import { NextRequest } from "next/server";
import { chromium } from "playwright";

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get("city");
  if (!city) {
    return new Response("No city provided", { status: 400 });
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const url = `https://www.peco-online.ro/index.php`;

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

  try {
    await page.waitForSelector(".fc-cta-consent", { timeout: 5000 });
    await page.click(".fc-cta-consent");
  } catch (e) {
    console.log("No cookies button found");
  }

  await page.fill("#nume_locatie", city);

  await page.keyboard.press("Enter");

  await page.waitForSelector("#nume_locatie");

  const trElements = await page.$$("tr");

  let price, location, provider;

  for (let i = 0; i < trElements.length; i++) {
    const pret = await trElements[i].$("span.pret");

    if (pret) {
      const text = await pret.innerText();
      if (text !== "0.00") {
        price = await pret.innerText();

        const img = await trElements[i].$("img");
        if (img) {
          const alt = await img.getAttribute("alt");
          provider = alt;
        }
        const allSpans = await trElements[i].$$("span");
        if (allSpans.length === 0) {
          continue;
        }
        const lastSpanText = await allSpans[allSpans.length - 1].innerText();
        location = lastSpanText;

        break;
      }
    }
  }
  await browser.close();

  return new Response(JSON.stringify({ price, location, provider }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
