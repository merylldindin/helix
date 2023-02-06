export class HomePageSelectors {
  public static get CookieBannerButton() {
    return cy.get("[aria-label='Accept our privacy policy']");
  }

  public static get CookieBannerDisclaimer() {
    return cy.contains(
      "This website uses cookies to improve user experience and to analyze traffic."
    );
  }

  public static get GithubProfile() {
    return cy.get("[aria-label='Follow Meryll Dindin on Github']");
  }
}
