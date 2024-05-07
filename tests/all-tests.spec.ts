import { test, expect } from "@playwright/test";

export function delay(time: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

test("test-all", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.waitForSelector('text="Edit Car"');

  let allData = await page.$$(".MuiTableRow-root");

  expect(allData.length).toBe(6);

  // click on Add Car
  await page.click('text="Add Car"');

  // fill the form
  await page.fill('input[placeholder="Make"]', "Volkswagen");
  await page.fill('input[placeholder="Model"]', "Passat");
  await page.fill('input[placeholder="Year"]', "2019");
  await page.fill('input[placeholder="Color"]', "Red");
  await page.screenshot({ path: "tests/screenshots/ss-after-add.png" });
  await page.click('text="Submit"');

  let toastify = await page.waitForSelector(".Toastify__toast-body");

  expect(toastify).toBeTruthy();

  allData = await page.$$(".MuiTableRow-root");
  expect(allData.length).toBe(6);

  // // click on the first "View Details" button
  const allLinkToDetails = await page.$$('text="Edit Car"');
  await allLinkToDetails[0].click();

  await page.waitForURL("**/cars/**");

  console.log("URL: ", page.url());

  await page.screenshot({ path: "tests/screenshots/car-page.png" });

  // // // change text to "Mercedes-Benz" for make
  await page.fill('input[placeholder="Make"]', "Mercedes-Benz");
  await page.fill('input[placeholder="Model"]', "E-Class");
  await page.fill('input[placeholder="Year"]', "2018");
  await page.fill('input[placeholder="Color"]', "Black");
  await page.click('text="Update Car"');

  toastify = await page.waitForSelector(".Toastify__toast-body");
  expect(toastify).toBeTruthy();

  await page.screenshot({ path: "tests/screenshots/car-updated.png" });
  await page.click("svg");

  // wait until the page is loaded
  await page.waitForSelector('text="Edit Car"');
  allData = await page.$$(".MuiCheckbox-root");

  for (let i = 1; i < 5; i++) {
    await allData[i].click();
  }

  await page.screenshot({ path: "tests/screenshots/cars-deleted.png" });
  await page.click('text="Delete Car"');

  // click on "Delete Car"
  await page.click('text="Delete Car"');
  await page.screenshot({ path: "tests/screenshots/all-deleted.png" });
});
