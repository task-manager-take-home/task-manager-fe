/// <reference types="cypress" />


describe("task manager", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://127.0.0.1:5001/api/v1/tasks", {
      fixture: "tasks.json",
    }).as("getTasks");
    cy.visit('http://localhost:3000/');
  });

  it("should display tasks", () => {
    cy.get('.card').first().should('contain', "Finish backend setup");
    cy.get('.card').first().should('contain', "Priority: immediate");
    cy.get('.card').last().should('contain', 'test 2');
    cy.get('.card').last().should('contain', 'Priority: immediate');
    cy.get('.card').should('have.length', '4');
  });

  it("should sort tasks correctly", () => {
    cy.get('#sort').select("Completed");
    cy.get(".card").should('have.length', '2');
    cy.get('#sort').select("Priority");
    cy.get(".card").should('have.length', '4');
    cy.get('.card').first().should('contain', 'Priority: immediate');
    cy.get('.card').last().should('contain', 'Priority: secondary');
  });

  it("should allow user to add tasks", () => {
    cy.intercept("POST", "http://127.0.0.1:5001/api/v1/tasks", (req) => {
      req.reply({
        statusCode: 201,
        body: {
          description: "CYPRESS DESCRIPTION",
          id: 5,
          priority: "immediate",
          status: "complete",
          title: "TEST TASK"
        },
      });
    }).as("postTasks");
    cy.get('#input-type-text-title').type('TEST TASK');
    cy.get('#input-type-text-description').type('CYPRESS DESCRIPTION');
    cy.get('#priority').select('Immediate');
    cy.get('#status').select('Complete');
    cy.get('[style="display: flex; justify-content: center; margin-top: 20px;"] > .usa-button').click();
    cy.wait('@postTasks').its('response.statusCode').should('eq', 201);
    cy.get('.card').last().should('contain', 'TEST TASK');
  });
});
