/// <reference types="cypress" />

describe("First Tests", () => {
  it("should load homepage with  data", () => {
    cy.intercept("GET", "**/all").as("allVehicles");
    cy.visit("/");
    cy.wait("@allVehicles");
    cy.get("@allVehicles").then((body) => {
      expect(body.response.statusCode).to.equal(200);

      expect(body.response.body.length).to.be.above(0);
    });
  });

  it("should load homepage without data", () => {
    const emptyArr = [];

    cy.intercept("GET", "**/all", { emptyArr });
    cy.visit("/");

    cy.get(".MuiTable-root").should("contain", "No records to display");
  });

  it.only("should login", () => {
    cy.visit("/login");
    cy.get("form").find('[name="email"]').clear().type(Cypress.env("email"));
    cy.get("form")
      .find('[name="password"]')
      .clear()
      .type(Cypress.env("password"));
    cy.contains("Sign In").click();
  });
});
