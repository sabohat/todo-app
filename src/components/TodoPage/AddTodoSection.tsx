import { TODO_ACTIONS } from '@/constants/todo'
import React, { useState } from 'react'

export default function AddTodoSection ({ dispatch }: any) {
    const [title, setTitle] = useState("")
    return (
        <>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <button onClick={() => dispatch({ type: TODO_ACTIONS.ADD, payload: { title: title } })}>Add</button>
        </>
    )
}
