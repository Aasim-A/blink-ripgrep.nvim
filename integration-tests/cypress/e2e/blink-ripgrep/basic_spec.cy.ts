describe("the basics", () => {
  it("shows words in other files as suggestions", () => {
    cy.visit("http://localhost:5173")
    cy.startNeovim().then((dir) => {
      // wait until text on the start screen is visible
      cy.contains("If you see this text, Neovim is ready!")
      cy.typeIntoTerminal(
        // clear the current line and enter insert mode
        "cc",
      )

      // this will match text from ../../../test-environment/other-file.txt
      //
      // If the plugin works, this text should show up as a suggestion.
      cy.typeIntoTerminal(
        // NOTE: need to break it into parts so that this test file itself does
        // not match the search :)
        "hip" + "234",
      )

      cy.contains("Hippopotamus" + "234 (rg)")

      // should show documentation with more details about the match
      //
      // should show the text for the matched line
      cy.contains("Hippopotamus" + "234 was my previous password")
      // should show the file name
      cy.contains(dir.contents["other-file.txt"].name)
    })
  })
})