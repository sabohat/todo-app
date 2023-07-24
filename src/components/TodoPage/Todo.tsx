import { TodoItem, TODO_ACTIONS, TODO_STATUSES } from '@/constants/todo'
import React from 'react'
import moment from 'moment'

import Button from '../common/Button'



export default function Todo ({ todo, dispatch, mouseDown }: any) {
    return (
        <div
            id={todo.id}
            onMouseDown={(e) => mouseDown(e)}
            className='
        draggable
        select-none
        bg-white rounded-lg flex flex-col p-3 m-3 space-y-3 shadow-md cursor-grab hover:shadow-xl'
        >
            <span>Title: {todo.title}</span>
            <span>Status: {todo.status}</span>
            <span>Created at: {moment(todo.createdAt).format('DD-MM-YYYY')}</span>
            <Button
                text="Delete"

                onClick={() => dispatch({ type: TODO_ACTIONS.DELETE, payload: { id: todo.id } })}
            />
            <div>
            </div>
        </div>
    )
}
