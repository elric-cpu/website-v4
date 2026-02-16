import { test, expect } from "@playwright/test";
import { routes } from "../utils/routes";
import { blockExternal } from "../../e2e/utils";

test.describe("Regression: Content and Routes", () => {
  test.beforeEach(async ({ page }) => {
    await blockExternal(page);
  });

  test("blog index and post render", async ({ page }) => {
    await page.goto("/blog");
    await expect(
      page.getByRole("heading", { level: 1, name: "Expert Advice & Insights" }),
    ).toBeVisible();

    await page.goto("/blog/water-damage-insurance-oregon");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /How Insurance Works for Water Damage/i,
      }),
    ).toBeVisible();
  });

  test("service area route renders with params", async ({ page }) => {
    await page.goto("/service-areas/mid-valley/salem");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Salem, OR Restoration/i,
      }),
    ).toBeVisible();
  });

  test("estimator page supports mocked api", async ({ page }) => {
    await page.route("**/api/**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto(routes.estimator);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Home Maintenance Estimator",
      }),
    ).toBeVisible();
  });
});
