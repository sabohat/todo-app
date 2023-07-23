import { TODO_ACTIONS } from '@/constants/todo'
import React, { useState } from 'react'
import Button from '../common/Button'

export default function AddTodoSection ({ dispatch }: any) {
    const [title, setTitle] = useState("")
    return (
        <div className='flex space-x-3'>
            <input
                className='p-2 rounded-md'
                value={title}
                onChange={(e) => setTitle(e.target.value)} />
            <Button
                text="add"
                onClick={() => dispatch({ type: TODO_ACTIONS.ADD, payload: { title: title } })}
            />
        </div>
    )
}
