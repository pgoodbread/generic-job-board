/// <reference types="cypress"/>

describe("Navigation", () => {
  it("should have a logo at the top", () => {
    cy.visit("http://localhost:3000/");
    cy.get("header").find("img").should("have.attr", "src");
  });
});
