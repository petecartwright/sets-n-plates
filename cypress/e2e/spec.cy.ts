describe('Sets page', () => {
  it('shows expected weights on happy path', () => {
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

  it('shows helpful error text when start weight and work weight are less than the bar ', () => {
    // arrange
    cy.visit('/ ')

    // act
    cy.findAllByLabelText('Bar').select('45')
    cy.findAllByLabelText('Start Weight').clear().type('40')
    cy.findAllByLabelText('Work Weight').clear().type('20')

    // assert
    cy.contains(
      'Start weighasdfasdft must be greater than or equal to bar weight'
    ).should('exist')
    cy.contains(
      'Work weight must be greater than or equal to bar weight'
    ).should('exist')
  })

  it('shows helpful error text when start weight is greater than work weight ', () => {
    // arrange
    cy.visit('/ ')

    // act
    cy.findAllByLabelText('Bar').select('15')
    cy.findAllByLabelText('Start Weight').clear().type('40')
    cy.findAllByLabelText('Work Weight').clear().type('20')

    // assert
    cy.contains('Start weight must be less than work weight').should('exist')
    cy.contains('Work weight must be greater than start weight').should('exist')
  })
})

export {}
