import type { Page } from "@playwright/test";

export class HomePageSelectors {
  public static cookieBannerButton(page: Page) {
    return page.locator("[aria-label='Accept our privacy policy']");
  }

  public static cookieBannerDisclaimer(page: Page) {
    return page.getByText(
      "This website uses cookies to improve user experience and to analyze traffic.",
    );
  }

  public static venturesNavigation(page: Page) {
    return page.locator(
      "[aria-label='Learn more about Meryll Dindin current work']",
    );
  }
}
