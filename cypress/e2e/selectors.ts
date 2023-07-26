export class HomePageSelectors {
  public static get CookieBannerButton() {
    return cy.get("[aria-label='Accept our privacy policy']");
  }

  public static get CookieBannerDisclaimer() {
    return cy.contains(
      "This website uses cookies to improve user experience and to analyze traffic."
    );
  }

  public static get VenturesNavigation() {
    return cy.get("[aria-label='Learn more about Meryll Dindin current work']");
  }
}
