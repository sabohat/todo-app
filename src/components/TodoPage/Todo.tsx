import { TodoItem, TODO_ACTIONS, TODO_STATUSES } from '@/constants/todo'
import React from 'react'
import { EnumMember } from 'typescript'
import Button from '../common/Button'



export default function Todo ({ todo, dispatch }: any) {
    return (
        <div className='bg-white rounded-lg flex flex-col p-3 m-3 space-y-3 shadow-md cursor-pointer hover:shadow-xl'
        >
            <span>Id: {todo.id}</span>
            <span>Title: {todo.title}</span>
            <span>Status: {todo.status}</span>
            <span>Created at: {todo.createdAt}</span>
            <Button
                text="Update Status"
                onClick={() => dispatch({ type: TODO_ACTIONS.UPDATE_STATUS, payload: { id: todo.id, status: TODO_STATUSES.COMPLETED } })}
            />

            <Button
                text="Delete"
                onClick={() => dispatch({ type: TODO_ACTIONS.DELETE, payload: { id: todo.id } })}
            />
            <div>
            </div>
        </div>
    )
}
