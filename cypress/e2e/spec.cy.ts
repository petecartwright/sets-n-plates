describe('Sets page', () => {
  it('Happy path shows expected weights', () => {
    // arrange
    cy.visit('/ ')

    // act
    cy.findAllByLabelText('Bar').select('45')
    cy.findAllByLabelText('Start Weight').clear().type('45')
    cy.findAllByLabelText('Work Weight').type('135')

    // assert
    cy.contains('empty bar!').should('exist')
    cy.contains('10 | 1.25').should('exist')
    cy.contains('10 | 10 | 2.5').should('exist')
    cy.contains('25 | 5 | 2.5 | 1.25').should('exist')
    cy.contains('45').should('exist')
  })
})

export {}
