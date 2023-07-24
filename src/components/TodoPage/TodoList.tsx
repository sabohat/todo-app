import { TodoItem, todoStatusList, TODO_ACTIONS, TODO_STATUSES } from '@/constants/todo'
import React, { useEffect, useRef, useState } from 'react'
import Todo from './Todo'
import TodoCategoryCard from './TodoCategoryCard'

export default function TodoList ({ todos, dispatch }: any) {
    const parentRef = useRef<null | HTMLDivElement>(null)

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
    }, [todos])

    const mouseDown = (event: any) => {
        if (event.target.dataset.type === 'button') return

        const draggableItem: any = event.target.closest('.draggable');

        const parentNode = draggableItem.parentNode

        if (!draggableItem) return console.log("nothing to grab here")

        let shiftX = event.clientX - draggableItem.getBoundingClientRect().left;
        let shiftY = event.clientY - draggableItem.getBoundingClientRect().top;

        function moveAt (pageX: any, pageY: any) {
            draggableItem.style.left = pageX - shiftX + 'px';
            draggableItem.style.top = pageY - shiftY + 'px';
        }

        // to make it positioned relative to the parent - todo list container 
        draggableItem.style.position = 'absolute';
        draggableItem.style.zIndex = 1000;
        document.body.append(draggableItem);

        // move our absolutely positioned draggableItem under the pointer
        moveAt(event.pageX, event.pageY);

        let currentDroppable: any = null;

        function onMouseMove (event: any) {
            moveAt(event.pageX, event.pageY);

            draggableItem.hidden = true;
            [...draggableItem.children].map((el: any) => el.hidden = true)
            let elemBelow = document.elementFromPoint(event.clientX, event.clientY);

            draggableItem.hidden = false;
            [...draggableItem.children].map((el: any) => el.hidden = false)

            // mousemove events may trigger out of the window (when the draggableItem is dragged off-screen)
            // if clientX/clientY are out of the window, then elementFromPoint returns null
            if (!elemBelow) {
                draggableItem.style.position = 'static';
                draggableItem.style.zIndex = 0;
                // move the draggable into new parent
                // if draggable is dropped to somewhere outside the box, move it back to its original parent
                parentNode.appendChild(draggableItem)
                document.removeEventListener('mousemove', onMouseMove);
                return
            }

            // potential droppables are labeled with the class "droppable" (can be other logic)
            let droppableBelow = elemBelow.closest('.droppable');

            if (currentDroppable != droppableBelow) {
                // we're flying in or out...
                // note: both values can be null
                //   currentDroppable=null if we were not over a droppable before this event (e.g over an empty space)
                //   droppableBelow=null if we're not over a droppable now, during this event

                if (currentDroppable) {
                    // the logic to process "flying out" of the droppable (remove highlight)
                    leaveDroppable(currentDroppable);
                }
                currentDroppable = droppableBelow;
                if (currentDroppable) {
                    // the logic to process "flying in" of the droppable
                    enterDroppable(currentDroppable);
                }
            }
        }

        // (2) move the draggableItem on mousemove
        document.addEventListener('mousemove', onMouseMove);

        // (3) drop the draggableItem, remove unneeded handlers
        draggableItem.onmouseup = function () {
            draggableItem.style.position = 'static';
            draggableItem.style.zIndex = 0;

            // move back to parent ella nd let react handle the last move
            // to avoid react error: no el found
            parentNode.appendChild(draggableItem)
            draggableItem.classList.add('invisible');

            leaveDroppable(currentDroppable)
            document.removeEventListener('mousemove', onMouseMove);
            draggableItem.onmouseup = null;

            if (currentDroppable) {

                dispatch({
                    type: TODO_ACTIONS.UPDATE_STATUS, payload: {
                        id: draggableItem.id,
                        status: currentDroppable.dataset.category
                    }
                })

            }
            draggableItem.classList.remove('invisible');
        };
    }

    function enterDroppable (elem: any) {
        if (elem)
            elem.style.opacity = 0.6;
    }

    function leaveDroppable (elem: any) {
        if (elem)
            elem.style.opacity = 1;
    }
    return (
        <div className=' 
        mt-4
        w-full p-4 rounded-sm
        min-h-[500px]
        bg-white
        space-x-3
        grid md:grid-cols-2 lg:grid-cols-5'
            ref={parentRef}
        >
            {todoStatusList.map((status: string) =>
                <TodoCategoryCard
                    key={status}
                    category={status}
                    list={sortedObj[status as TODO_STATUSES]}
                    dispatch={dispatch}
                    mouseDown={mouseDown}
                />
            )}

        </div>
    )
}
