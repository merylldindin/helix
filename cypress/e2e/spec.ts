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

  it("Github profile", () => {
    HomePageSelectors.GithubProfile.should("be.visible");
    HomePageSelectors.GithubProfile.should(
      "have.attr",
      "href",
      "https://github.com/merylldindin"
    );
  });
});
