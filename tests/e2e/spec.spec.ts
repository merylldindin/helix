import { expect, test } from "@playwright/test";

import { HomePageSelectors } from "./selectors";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Cookie banner", async ({ page }) => {
    const button = HomePageSelectors.cookieBannerButton(page);
    const disclaimer = HomePageSelectors.cookieBannerDisclaimer(page);

    await expect(button).toBeEnabled({ timeout: 10_000 });
    await expect(disclaimer).toBeVisible();

    await button.click({ force: true });

    await expect(button).not.toBeVisible();
    await expect(disclaimer).not.toBeVisible();
  });

  test("Ventures navigation", async ({ page }) => {
    const link = HomePageSelectors.venturesNavigation(page);

    await expect(link).toBeVisible({ timeout: 10_000 });
    await expect(link).toHaveAttribute("href", "/ventures/");
  });
});
