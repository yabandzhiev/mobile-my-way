/// <reference types="cypress" />

describe("First Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should load homepage without data", () => {
    const emptyArr = [];

    cy.intercept("GET", "**/all", { emptyArr });

    cy.get(".MuiTable-root").should("contain", "No records to display");
  });

  it("should load homepage with  data", () => {
    cy.intercept("GET", "**/all").as("allVehicles");
    cy.wait("@allVehicles");
    cy.get("@allVehicles").then((body) => {
      expect(body.response.statusCode).to.equal(200);

      expect(body.response.body.length).to.be.above(0);
    });
  });

  it("should login, check localStorage and go to homepage", () => {
    cy.loginToApp();

    cy.wait("@loginReq");
    cy.get("@loginReq").then((body) => {
      const token = body.response.body.jwtToken;
      const userId = body.response.body.user.id;

      const localStorageItems = JSON.parse(localStorage.getItem("user"));
      const localStorageToken = localStorageItems.token;
      const localStorageUserId = localStorageItems.id;

      expect(token).to.equal(localStorageToken);
      expect(userId).to.equal(localStorageUserId);
      cy.url().should("eq", "http://localhost:3000/");
      cy.get(".header")
        .contains("Logout")
        .click()
        .should(() => {
          expect(localStorage.getItem("user")).to.be.null;
        });
    });
  });

  it("should have add button after sign in", () => {
    cy.loginToApp();
    cy.wait("@loginReq");

    cy.get('button[title="Add"]').as("addBtn");

    cy.get("@addBtn").should("be.visible");
    cy.get(".header")
      .contains("Logout")
      .click()
      .should(() => {
        expect(localStorage.getItem("user")).to.be.null;
      });
  });
});
