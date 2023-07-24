import { statusColor, TodoItem, TODO_STATUSES } from '@/constants/todo'
import React from 'react'
import Todo from './Todo'

export default function TodoCategoryCard ({ category, list, dispatch, mouseDown }: any) {
    const bgColor = statusColor[category as TODO_STATUSES] || "bg-blue-300"
    return (
        <div
            data-category={category}
            data-test={`category-${category}`}
            className={`
        droppable
        select-none
        min-w-40 min-h-80
        ${bgColor}
        rounded-md
        flex flex-col
        mx-2
        `}>
            <span
                className='
                text-md capitalize 
                bg-gray-200/50 p-2 rounded-t-md
                text-gray-700
                '
            >{category}</span>
            {list.map((todo: TodoItem) =>
                <Todo
                    key={todo.id}
                    todo={todo}
                    dispatch={dispatch}
                    mouseDown={mouseDown}
                />
            )}
        </div>
    )
}
