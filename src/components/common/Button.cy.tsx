import React from 'react'
import Button from './Button'

describe('<Button />', () => {
  it('renders + onClick is called', () => {

    const onChangeSpy = cy.spy().as('onChangeSpy')
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Button dataTest='test' text="I am a button" onClick={onChangeSpy} />)
    cy.get('[data-test=test]').should('have.text', "I am a button")
      .click()
    cy.get('@onChangeSpy').should('be.called')
  })
})