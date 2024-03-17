import { test, expect } from "@playwright/test";

test("test-all", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.click('text="Load Data"');

  let allData = await page.$$(".MuiTableRow-root");
  // check if the data has been loaded
  expect(allData.length).toBe(11);

  // click on Add Car
  await page.click('text="Add Car"');

  // fill the form
  await page.fill('input[placeholder="Make"]', "Toyota");
  await page.fill('input[placeholder="Model"]', "Corolla");
  await page.fill('input[placeholder="Year"]', "2019");
  await page.fill('input[placeholder="Color"]', "Red");
  await page.screenshot({ path: "tests/screenshots/ss-after-add.png" });
  await page.click('text="Submit"');

  allData = await page.$$(".MuiTableRow-root");
  expect(allData.length).toBe(12);

  // click on the last "View Details" button
  const allLinkToDetails = await page.$$('text="View Details"');
  await allLinkToDetails[allLinkToDetails.length - 1].click();

  const allViewDetails = await page.$$('text="View Details"');
  await allViewDetails[allViewDetails.length - 1].click();
  await page.waitForURL("**/cars/**");

  await page.screenshot({ path: "tests/screenshots/car-page.png" });

  expect(await page.getAttribute('input[placeholder="Make"]', "value")).toBe(
    "Toyota",
  );
  expect(await page.getAttribute('input[placeholder="Model"]', "value")).toBe(
    "Corolla",
  );
  expect(await page.getAttribute('input[placeholder="Year"]', "value")).toBe(
    "2019",
  );
  expect(await page.getAttribute('input[placeholder="Color"]', "value")).toBe(
    "Red",
  );

  // // change text to "Mercedes-Benz" for make
  await page.fill('input[placeholder="Make"]', "Mercedes-Benz");
  await page.fill('input[placeholder="Model"]', "E-Class");
  await page.fill('input[placeholder="Year"]', "2018");
  await page.fill('input[placeholder="Color"]', "Black");
  await page.click('text="Update Car"');

  await page.screenshot({ path: "tests/screenshots/car-updated.png" });
  await page.click("svg");

  // wait until the page is loaded
  await page.waitForSelector("text=Load Data");
  allData = await page.$$(".MuiCheckbox-root");

  for (let i = 1; i < 5; i++) {
    await allData[i].click();
  }

  await page.screenshot({ path: "tests/screenshots/cars-deleted.png" });
  await page.click('text="Delete Car"');

  await allData[0].click();

  // click on "Delete Car"
  await page.click('text="Delete Car"');
  await page.screenshot({ path: "tests/screenshots/all-deleted.png" });

  allData = await page.$$(".MuiCheckbox-root");
  expect(allData.length).toBe(1);
});
