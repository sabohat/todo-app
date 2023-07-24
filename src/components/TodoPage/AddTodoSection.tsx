import { TODO_ACTIONS } from '@/constants/todo'
import React, { useState } from 'react'
import Button from '../common/Button'

export default function AddTodoSection ({ dispatch }: any) {
    const [title, setTitle] = useState("")

    function isValidTitle (title: string) {
        if (title.trim() === "") return false
        return true
    }

    return (
        <div className='flex space-x-3 mt-5'>
            <input
                className='p-2 rounded-md'
                value={title}
                onChange={(e) => setTitle(e.target.value)} />
            <Button
                text="Add Task"
                onClick={() => {
                    if (!isValidTitle(title))
                        return alert('Please insert a valid title')
                    setTitle("")
                    dispatch({ type: TODO_ACTIONS.ADD, payload: { title: title } })
                }}
            />
        </div>
    )
}
