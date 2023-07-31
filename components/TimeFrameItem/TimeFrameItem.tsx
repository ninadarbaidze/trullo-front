import { BoardButton } from 'components/BoardButton';
import React, { useEffect, useRef, useState } from 'react';

const TimeFrameItem = (props) => {
  // const triggerRef = useRef(null);

  const [height, setHeight] = useState(0);
  const [leftPosition, setLeftPosition] = useState(0);
  const [width, setWidth] = useState(0);
  // const [initialHeight, setInitialHeight] = useState(0);

  const [mousePosition, setMousePosition] = useState();

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [timeFrames, setTimeFrames] = useState<
    { start: string; end: string; id: number }[]
  >([]);
  const [currentEndTime, setCurrentEndTime] = useState('');
  const [lastColoredIndex, setLastColoredIndex] = useState(-1);

  const triggerRef = useRef(null);

  const [initialHeight, setInitialHeigth] = useState(0);

  useEffect(() => {
    if (isMouseDown) {
      const resizableElement = triggerRef.current;
      const styles = window.getComputedStyle(resizableElement);
      let topHeight = parseInt(styles.height, 10);
      let bottomHeight = parseInt(styles.height, 10);
      let yCord = 0;
      let initial = 0;

      resizableElement!.style.left = '50px';

      const onMouseMoveBottomResize = (event) => {
        event.preventDefault();

        const dy = event.clientY - yCord;
        if (initial < event.clientY) {
          console.log(topHeight, 'top');
          bottomHeight = 0;

          topHeight = topHeight + dy;
          // console.log(initialHeight, 'down');
          resizableElement!.style.top = `${initialHeight - 96}px`;
          resizableElement!.style.bottom = null;
          resizableElement!.style.height = `${topHeight}px`;
        } else {
          topHeight = 0;

          bottomHeight = bottomHeight - dy;

          // console.log(initialHeight, 'up');

          resizableElement!.style.bottom = `${styles.bottom}`;
          resizableElement!.style.top = null;
          console.log(bottomHeight, 'bottom');
          resizableElement!.style.height = `${bottomHeight}px`;
        }

        yCord = event.clientY;
      };

      // document.addEventListener('mousemove', onMouseMoveBottomResize);
      const onMouseUpBottomResize = (event) => {
        document.removeEventListener('mousemove', onMouseMoveBottomResize);
      };

      const onMouseDownBottomResize = (event) => {
        initial = event.clientY;
        yCord = event.clientY;

        document.addEventListener('mousemove', onMouseMoveBottomResize);
        document.addEventListener('mouseup', onMouseUpBottomResize);
      };
      onMouseDownBottomResize(event);

      const resizeBottom = triggerRef.current;
      resizeBottom?.addEventListener('mousedown', onMouseDownBottomResize);

      return () => {
        resizeBottom?.removeEventListener('mousedown', onMouseDownBottomResize);
      };
    }
  }, [initialHeight, isMouseDown]);

  return (
    <>
      {isMouseDown && (
        <div
          className={`w-full min-w-[15px]  left-0  bg-red-500 z-50 border rounded-md overflow-x-clip overflow-y-auto absolute`}
          // style={{ top: initialHeight - 96 }}
          ref={triggerRef}
        ></div>
      )}
      <li key={props.i} className='flex gap-2 relative'>
        <div className='w-12 text-xs'>{props.hour}</div>
        <div
          id={`hour-${props.i}`}
          className='border w-full pb-12'
          onMouseDown={(e) => {
            setInitialHeigth(e.clientY);

            setIsMouseDown(true);
          }}

          // onMouseDown={(e) => {
          //   e.preventDefault();
          //   setIsMouseDown(true);
          //   console.log('down');

          //   props.setInitialHeight(e.clientY);
          //   // const mouseY = e.clientY;

          //   // Update the state with the mouse position
          //   // setMousePosition(mouseY);
          //   // removeStyles();
          //   // setTimeFrames((prev) => {
          //   //   const newState = [...prev];
          //   //   let newId = e.target.id.split('-')[1];
          //   //   let obj = {
          //   //     id: prev.length > 0 ? prev?.at(-1)?.id + 1 : 1,
          //   //     start: newId,
          //   //   };
          //   //   return newState.concat(obj);
          //   // });
          //   //   console.log(currentEndTime);
          //   //   const currentDiv = document.getElementById(`hour-${i}`);
          //   //   currentDiv.textContent = `${hour}-${currentEndTime}`;
          // }}
          // onMouseUp={(e) => {
          //   e.preventDefault();

          //   console.log('up');
          //   setIsMouseDown(false);
          //   // setTimeFrames((prev) => {
          //   //   const newState = [...prev];
          //   //   let newId = e.target.id.split('-')[1];
          //   //   newState.at(-1).end = newId;
          //   //   return newState;
          //   // });
          // }}
          // // onMouseMove={(e) => {
          // //   if (isMouseDown) {
          // //     handleMouseMove(e);

          // //     // handleMouseMove2();
          // //     // setHeight(props.i * 40);
          // //   }
          // // }}
        >
          {/* {timeFrames.at(-1)?.start == hour && (
      <p>{`${timeFrames.at(-1)?.start} - ${currentEndTime}`}</p>
    )} */}
        </div>
      </li>
    </>
  );
};

export default TimeFrameItem;
