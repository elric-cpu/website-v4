import { test, expect } from "@playwright/test";
import { blockExternal } from "../../e2e/utils";

test.describe("Maintenance Planner Modules", () => {
  test.beforeEach(async ({ page }) => {
    await blockExternal(page);
  });

  test("residential page renders planner module", async ({ page }) => {
    await page.goto("/services/residential-maintenance");
    await expect(
      page.getByRole("heading", { name: "Home Maintenance Planner" }),
    ).toBeVisible();

    await expect(page.getByLabel("ZIP code")).toBeVisible();
    await expect(page.getByLabel("Square footage")).toBeVisible();
    await expect(page.getByLabel("Home age")).toBeVisible();
    await expect(page.getByLabel("Roof type")).toBeVisible();
  });

  test("commercial page renders planner module", async ({ page }) => {
    await page.goto("/services/commercial");
    await expect(
      page.getByRole("heading", {
        name: "Commercial Maintenance Planner",
      }),
    ).toBeVisible();

    await expect(page.getByLabel("ZIP code")).toBeVisible();
    await expect(page.getByLabel("Square footage")).toBeVisible();
    await expect(page.getByLabel("Building age")).toBeVisible();
    await expect(page.getByLabel("Building type")).toBeVisible();
  });
});
