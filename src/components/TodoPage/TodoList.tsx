import { TodoItem, todoStatusList, TODO_STATUSES } from '@/constants/todo'
import React, { useEffect, useState } from 'react'
import Todo from './Todo'
import TodoCategoryCard from './TodoCategoryCard'

export default function TodoList ({ todos, dispatch }: any) {

    const dragEnter = () => { }
    const dragLeave = () => { }
    const drag = () => { }
    const drop = () => { }
    const allowDrop = () => { }

    const [sortedObj, setSortedObj] = useState({
        [TODO_STATUSES.BACKLOG]: [],
        [TODO_STATUSES.TODO]: [],
        [TODO_STATUSES.IN_PROGRESS]: [],
        [TODO_STATUSES.TEST]: [],
        [TODO_STATUSES.COMPLETED]: [],
    })

    useEffect(() => {
        const sortedObj: any = {
            [TODO_STATUSES.BACKLOG]: [],
            [TODO_STATUSES.TODO]: [],
            [TODO_STATUSES.IN_PROGRESS]: [],
            [TODO_STATUSES.TEST]: [],
            [TODO_STATUSES.COMPLETED]: [],
        }
        todos.map((todo: any) => {
            if (todo.deletedAt !== null) return
            else if (todo.status === TODO_STATUSES.TODO)
                sortedObj[TODO_STATUSES.TODO].push(todo)
            else if (todo.status === TODO_STATUSES.BACKLOG)
                sortedObj[TODO_STATUSES.BACKLOG].push(todo)
            else if (todo.status === TODO_STATUSES.IN_PROGRESS)
                sortedObj[TODO_STATUSES.IN_PROGRESS].push(todo)
            else if (todo.status === TODO_STATUSES.TEST)
                sortedObj[TODO_STATUSES.TEST].push(todo)
            else if (todo.status === TODO_STATUSES.COMPLETED)
                sortedObj[TODO_STATUSES.COMPLETED].push(todo)
        })
        setSortedObj(sortedObj)
        console.log("TODOS updates")
    }, [todos])

    return (
        <div className=' 
        mt-4
        w-full p-4 rounded-sm
        min-h-[500px]
        bg-white
        space-x-3
        grid md:grid-cols-2 lg:grid-cols-5'
            data-column="todo"
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDragOver={allowDrop}
            onDrop={drop}
        >
            {todoStatusList.map((status: string) =>
                <TodoCategoryCard
                    category={status}
                    list={sortedObj[status as TODO_STATUSES]}
                    dispatch={dispatch}
                />
            )}

        </div>
    )
}
