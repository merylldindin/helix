/**
 * This prevents Cypress from failing tests
 * on uncaught exceptions.
 */

Cypress.on("uncaught:exception", () => false);
