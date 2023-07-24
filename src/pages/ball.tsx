import React, { useRef } from 'react'

export default function BallDnD () {

  const parentRef = useRef<null | HTMLDivElement>(null)

  const mouseDown = (event: any) => {
    const ball: any = event.target
    const parentNode = ball.parentNode

    if (!ball) return console.log("nothing to grab here")

    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;


    ball.style.position = 'absolute';
    ball.style.zIndex = 1000;

    // move it out of any current parents directly into body
    // to make it positioned relative to the body
    // document.body.append(ball);
    parentRef.current?.append(ball);

    // centers the ball at (pageX, pageY) coordinates
    function moveAt (pageX: any, pageY: any) {
      ball.style.left = pageX - shiftX + 'px';
      ball.style.top = pageY - shiftY + 'px';
    }

    // move our absolutely positioned ball under the pointer
    moveAt(event.pageX, event.pageY);

    let currentDroppable: any = null;

    function onMouseMove (event: any) {
      moveAt(event.pageX, event.pageY);

      ball.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      ball.hidden = false;

      // mousemove events may trigger out of the window (when the ball is dragged off-screen)
      // if clientX/clientY are out of the window, then elementFromPoint returns null
      if (!elemBelow) return;

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

    // function onMouseMove (event: any) {
    //   moveAt(event.pageX, event.pageY);
    // }

    // (2) move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // (3) drop the ball, remove unneeded handlers
    ball.onmouseup = function () {
      ball.style.position = 'static';
      ball.style.zIndex = 0;
      if (currentDroppable) {
        // move the draggable into new parent
        currentDroppable.appendChild(ball)
      } else {
        // if draggable is dropped to somewhere outside the box, move it back to its original parent
        parentNode.appendChild(ball)
      }
      document.removeEventListener('mousemove', onMouseMove);
      ball.onmouseup = null;
    };
  }



  function enterDroppable (elem: any) {
    elem.style.background = 'pink';
  }

  function leaveDroppable (elem: any) {
    elem.style.background = '';
  }

  return (
    <div>
      <h1>DnD Container here </h1>
      <div style={{ backgroundColor: "yellow", height: "100px", display: "flex" }}
        ref={parentRef}>

        <div
          className='droppable'
          style={{ height: "100px", width: "200px", background: "green" }}
        >Box
          <div
            onMouseDown={(e) => mouseDown(e)}
            style={{ background: "pink", width: "40px", cursor: "grab" }}
          >
            Ball 1
            <span>dsomadsfa</span>
          </div>
          <div
            onMouseDown={(e) => mouseDown(e)}
            style={{ background: "pink", width: "40px", cursor: "grab" }}
          >
            Ball 3
          </div>
        </div>
        <div
          className='droppable'
          style={{ height: "100px", width: "200px", background: "red" }}
        >
          Box
          <div
            onMouseDown={(e) => mouseDown(e)}
            style={{ background: "pink", width: "40px", cursor: "grab" }}
          >
            Ball 2
          </div>
        </div>
      </div>

    </div>
  )
}
