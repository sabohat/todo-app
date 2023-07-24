import { TODO_STATUSES } from '@/constants/todo'
import { nanoid } from 'nanoid'
import React from 'react'
import TodoCategoryCard from './TodoCategoryCard'
import '../../app/globals.css'

describe('<TodoCategoryCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TodoCategoryCard
      category={TODO_STATUSES.BACKLOG}
      list={[{
        id: nanoid(),
        title: "First Task",
        status: TODO_STATUSES.BACKLOG,
        createdAt: Date.now(),
        deletedAt: null
      }]} />)

    cy.get('[data-test=todo-item]')
      .should('include.text', TODO_STATUSES.BACKLOG)
      .should('include.text', "First Task")
      .should('include.text', TODO_STATUSES.BACKLOG)

    cy.get('[data-test=delete-todo]')
      .should('exist')
  })
})