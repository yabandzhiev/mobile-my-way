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

  it.only("should have add button after sign in, add new vehicle, find it, delete it, after that log out", () => {
    cy.loginToApp();
    cy.wait("@loginReq");
    //addBtn
    cy.get('button[title="Add"]').as("addBtn");

    cy.get("@addBtn").should("be.visible").click();
    //add
    cy.get('tr[mode="add"]')
      .find("td")
      .then((td) => {
        cy.wrap(td[1]).type("Alfa");
        cy.wrap(td[2]).type("Romeo");
        cy.wrap(td[3]).type("1999");

        cy.wrap(td[4]).find('[aria-haspopup="listbox"]').click();
        cy.get('ul[role="listbox"]')
          .find("li")
          .then((li) => {
            cy.wrap(li[0]).click();
          });

        cy.wrap(td[5]).find('[aria-haspopup="listbox"]').click();
        cy.get('ul[role="listbox"]')
          .find("li")
          .then((li) => {
            cy.wrap(li[0]).click();
          });

        cy.wrap(td[6]).find('[aria-haspopup="listbox"]').click();
        cy.get('ul[role="listbox"]')
          .find("li")
          .then((li) => {
            cy.wrap(li[0]).click();
          });
        cy.wrap(td[7]).type(120);
        cy.wrap(td[8]).type("Blue");
        cy.wrap(td[9]).type("2999");
        cy.wrap(td[10]).type("Sofia");
        cy.wrap(td[11]).type(299999);
        cy.wrap(td[12]).type("AC, Parking Sensors");

        cy.wrap(td[0]).find('button[title="Save"]').click();
      });
    cy.get("tr")
      .should("contain", "Alfa")
      .and("contain", "Romeo")
      .and("contain", 1999);
    //edit
    cy.get("tr")
      .contains("Alfa")
      .prev()
      .then((buttons) => {
        cy.wrap(buttons).find('button[title="Edit"]').click();
      });

    cy.get('tr[mode="update"]').find('input[value="Alfa"]').type("111");

    cy.get('button[title="Save"]').click();

    cy.get("tr").should("contain", "Alfa111");

    //delete
    cy.get("tr")
      .contains("Alfa111")
      .prev()
      .then((buttons) => {
        cy.wrap(buttons).find('button[title="Delete"]').click();
        cy.get('tr[mode="delete"]').find('button[title="Save"]').click();
      });

    cy.get("tr").should("not.contain", "Alfa111");
    // //logout
    cy.get(".header")
      .contains("Logout")
      .click()
      .should(() => {
        expect(localStorage.getItem("user")).to.be.null;
      });
  });
});
