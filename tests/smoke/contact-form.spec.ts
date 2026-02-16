import { test, expect } from "@playwright/test";
import { expectH1, routes } from "../utils/routes";
import { blockExternal } from "../../e2e/utils";

test.describe("Smoke: Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await blockExternal(page);
  });

  test("contact form fields are present", async ({ page }) => {
    await page.goto(routes.contact);
    await expectH1(page, "Contact & Dispatch");

    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Phone")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("City")).toBeVisible();
    await expect(page.getByLabel("Service Needed")).toBeVisible();
    await expect(page.getByLabel("Message")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Send Message" }),
    ).toBeEnabled();
  });
});
