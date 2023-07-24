import { TodoItem } from '@/constants/todo'
import React from 'react'
import Todo from './Todo'

export default function TodoCategoryCard ({ category, list, dispatch, mouseDown }: any) {
    return (
        <div 
        data-category={category}
        className='
        droppable
        min-w-40 min-h-80
        bg-blue-200
        rounded-md
        flex flex-col
        '>
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
