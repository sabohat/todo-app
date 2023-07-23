'use client'
import React, { useReducer } from 'react'
import { nanoid } from 'nanoid'

import AddTodoSection from '@/components/TodoPage/AddTodoSection'
import { TodoItem, TODO_ACTIONS, TODO_STATUSES } from '@/constants/todo'
import Todo from '@/components/TodoPage/Todo'
import TodoList from '@/components/TodoPage/TodoList'

function reducer (
  todos: Array<TodoItem>,
  action: {
    type: TODO_ACTIONS
    payload?: any // TODO: add type
  }
) {

  switch (action.type) {
    case TODO_ACTIONS.ADD:
      return [...todos, newTodo(action.payload.title)]
    case TODO_ACTIONS.DELETE:
      // TODO:set deleted at to current time / do not delete
      return todos.map(todo => (todo.id === action.payload.id ? { ...todo, deletedAt: Date.now() } : todo));
    case TODO_ACTIONS.UPDATE_STATUS:
      // finds todo with the same id, and updates the status
      return todos.map(todo => (todo.id === action.payload.id ? { ...todo, status: action.payload.status } : todo));

  }
}

function newTodo (title: string) {
  return {
    id: nanoid(),
    title: title,
    status: TODO_STATUSES.TODO,
    createdAt: Date.now(),
    deletedAt: null
  }
}

export default function Home () {
  const [todos, dispatch] = useReducer<any>(reducer, [])

  return (
    <main className="w-full flex min-h-screen flex-col p-8 bg-gray-100">
      <>
        <h1 className='text-4xl text-blue-500'>To-do Application</h1>
        <div>TodoList</div>
        <AddTodoSection dispatch={dispatch} />
        {todos && <TodoList todos={todos} dispatch={dispatch} />}
      </>
    </main>
  )
}
