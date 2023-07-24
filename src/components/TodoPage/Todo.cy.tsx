import { TODO_STATUSES } from '@/constants/todo'
import { nanoid } from 'nanoid'
import React from 'react'
import '../../app/globals.css'

import Todo from './Todo'

describe('<Todo />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Todo todo={{
        id: nanoid(),
        title: "First Task",
        status: TODO_STATUSES.TODO,
        createdAt: Date.now(),
        deletedAt: null
      }} />)

    cy.get('[data-test=todo-item]')
      .should('include.text', "First Task")
      .should('include.text', TODO_STATUSES.TODO)

    cy.get('[data-test=delete-todo]')
      .should('exist')
  })
})