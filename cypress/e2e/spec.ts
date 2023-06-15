import { HomePageSelectors } from "./selectors";

describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Cookie banner", () => {
    HomePageSelectors.CookieBannerButton.should("be.enabled");
    HomePageSelectors.CookieBannerDisclaimer.should("be.visible");

    HomePageSelectors.CookieBannerButton.click();

    HomePageSelectors.CookieBannerButton.should("not.exist");
    HomePageSelectors.CookieBannerDisclaimer.should("not.exist");
  });

  it("Hustle navigation", () => {
    HomePageSelectors.HustleNavigation.should("be.visible");
    HomePageSelectors.HustleNavigation.should("have.attr", "href", "/hustle/");
  });
});
