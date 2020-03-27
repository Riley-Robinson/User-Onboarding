describe("Testing our inputs and submit our form", function(){
    beforeEach(function(){
        cy.visit("http://localhost:3000/");
    });
    it("add test to inputs and submit form", function() {
       cy.get('input[name="name"]')
        .type("kayleigh")
        .should("have.value", "kayleigh");
       cy.get('input[name="email"]')
        .type("email@email.com")
        .should("have.value", "email@email.com");
        cy.get('[name="password"]')
        .type("password")
        .should("have.value", "password");
       cy.get('[type="checkbox"]')
        .check()
        .should("be.checked");
        cy.get("button").click();
    });
});