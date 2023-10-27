describe("correct operation of the line reversal", () => {
  beforeEach(() => {
    cy.visit(`http://localhost:3000/recursion`);
  });

  it("if input empty, button disabled", () => {
    cy.get("input").should("be.empty");
    cy.get("button[type=submit]").should("be.disabled");
  });

  it("the line unfolds correctly", () => {
    const countOfCharacters = 5;

    const initialString = "Hello";
    const stepOne = [
      "rgb(210, 82, 225)",
      "rgb(0, 50, 255)",
      "rgb(0, 50, 255)",
      "rgb(0, 50, 255)",
      "rgb(210, 82, 225)",
    ];

    const stepTwoString = "oellH";
    const stepTwo = [
      "rgb(127, 224, 81)",
      "rgb(210, 82, 225)",
      "rgb(0, 50, 255)",
      "rgb(210, 82, 225)",
      "rgb(127, 224, 81)",
    ];

    const endString = "olleH";
    const stepThree = [
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
    ];
    cy.get("input").type(initialString);
    cy.get("button[type='submit']").click();

    cy.get("[data-testid=circle]").each(($el, index, $list) => {
      cy.get($list).should("have.length", countOfCharacters);
      cy.get($el).contains(initialString[index]);
      cy.get($el).should("have.css", "border-color", stepOne[index]);
    });

    cy.wait(500);

    cy.get("[data-testid=circle]").each(($el, index, $list) => {
      cy.get($list).should("have.length", countOfCharacters);
      cy.get($el).contains(stepTwoString[index]);
      cy.get($el).should("have.css", "border-color", stepTwo[index]);
    });

    cy.wait(500);

    cy.get("[data-testid=circle]").each(($el, index, $list) => {
      cy.get($list).should("have.length", countOfCharacters);
      cy.get($el).contains(endString[index]);
      cy.get($el).should("have.css", "border-color", stepThree[index]);
    });
  });
});
