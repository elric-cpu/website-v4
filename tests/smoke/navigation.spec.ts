import { test, expect } from "@playwright/test";
import { expectH1, routes } from "../utils/routes";
import { blockExternal } from "../../e2e/utils";

test.describe("Smoke: Primary Routes", () => {
  test.beforeEach(async ({ page }) => {
    await blockExternal(page);
  });

  test("services page renders", async ({ page }) => {
    await page.goto(routes.services);
    await expectH1(
      page,
      "Maintenance Plans, Restoration & Facility-Ready Services",
    );
  });

  test("resources page renders", async ({ page }) => {
    await page.goto(routes.resources);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Practical Resources for Home Restoration in Oregon/i,
      }),
    ).toBeVisible();
  });

  test("estimator page renders", async ({ page }) => {
    await page.goto(routes.estimator);
    await expectH1(page, "Home Maintenance Estimator");
  });
});
