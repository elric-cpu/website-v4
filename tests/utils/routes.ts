import { expect, type Page } from "@playwright/test";

export const routes = {
  home: "/",
  services: "/services",
  contact: "/contact",
  resources: "/resources",
  residentialMaintenance: "/services/residential-maintenance",
  commercialMaintenance: "/services/commercial",
  estimator: "/resources/home-maintenance-estimator",
};

export async function expectH1(page: Page, name: string) {
  await expect(page.getByRole("heading", { level: 1, name })).toBeVisible();
}
