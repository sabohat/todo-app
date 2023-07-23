import { TodoItem, TODO_ACTIONS, TODO_STATUSES } from '@/constants/todo'
import React from 'react'
import { EnumMember } from 'typescript'



export default function Todo ({ todo, dispatch }: any) {
    return (
        !todo.deletedAt ? <div>
            <span>{todo.title}</span>
            <span>{todo.status}</span>
            <button onClick={() => dispatch({ type: TODO_ACTIONS.UPDATE_STATUS, payload: { id: todo.id, status: TODO_STATUSES.COMPLETED } })}>update status</button>
            <button onClick={() => dispatch({ type: TODO_ACTIONS.DELETE, payload: { id: todo.id } })}>delete</button>
            <div>
            </div>
        </div>
            : <></>
    )
}
