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

  const handleMouseMove2 = () => {
    const left = triggerRef.current?.getBoundingClientRect();
    console.log(left);
    setLeftPosition(left?.x ?? 0);
    setHeight(left?.y ? left?.y - 100 : 0);
    setWidth(left?.width ?? 0);
  };

  const triggerRef = useRef(null);
  const refBottom = useRef(null);

  const handleMouseMove = (event) => {
    // const dy = event.clientY - yCord;
    // height = height - dy;
    // yCord = event.clientY;
    // resizableElement!.style.height = `${height}px`;
    // const resizableElement = triggerRef.current;
    // const styles = window.getComputedStyle(resizableElement);
    // let yCord = 0;
    // let height = parseInt(styles.height, 10);
    // const dy = event.clientY - yCord;
    // height = height + dy;
    // yCord = event.clientY;
    // let height = props.currentHeight - initialHeight + 50;
    // console.log(props.currentHeight);
    // triggerRef!.current.style.height = `${height}px`;
    // console.log(event.clientY, initialHeight);
    // movementY;
    // setHeight(height);
  };

  const [initialHeight, setInitialHeigth] = useState(0);

  useEffect(() => {
    const resizableElement = triggerRef.current;
    const styles = window.getComputedStyle(resizableElement);
    let height = parseInt(styles.height, 10);
    let yCord = 0;
    let initial = 0;

    // resizableElement!.style.top = '150px';
    resizableElement!.style.left = '50px';

    //TOP
    // const onMouseMoveTopResize = (event) => {
    //   const dy = event.clientY - yCord;
    //   height = height - dy;
    //   yCord = event.clientY;
    //   resizableElement!.style.height = `${height}px`;
    // };
    // const onMouseUpTopResize = (event) => {
    //   document.removeEventListener('mousemove', onMouseMoveTopResize);
    // };

    // const onMouseDownTopResize = (event) => {
    //   yCord = event.clientY;
    //   const styles = window.getComputedStyle(resizableElement);
    //   resizableElement!.style.bottom = styles.bottom;
    //   resizableElement!.style.top = null;
    //   document.addEventListener('mousemove', onMouseMoveTopResize);
    //   document.addEventListener('mouseup', onMouseUpTopResize);
    // };

    //BOTTOM

    const onMouseMoveBottomResize = (event) => {
      event.preventDefault();

      const dy = event.clientY - yCord;
      if (initial < event.clientY) {
        height = height + dy;

        resizableElement!.style.top = styles.top;
        resizableElement!.style.bottom = null;
      } else {
        height = height - dy;
        resizableElement!.style.top = null;
        resizableElement!.style.bottom = styles.bottom;
      }

      // const elExists = document.getElementById('gogo');

      // initial;

      // if (true) {
      //   // Mouse moves down
      //   height = height + dy;

      //   resizableElement!.style.top = styles.top;
      //   resizableElement!.style.bottom = null;

      //   elExists?.classList.add('down');
      //   elExists?.classList.remove('up');
      // } else {
      // Mouse moves up
      // height = height - dy;
      // resizableElement!.style.top = null;
      // resizableElement!.style.bottom = styles.bottom;
      // elExists?.classList.add('up');
      // elExists?.classList.remove('down');
      // }
      // console.log(props.initialHeight);

      yCord = event.clientY;
      resizableElement!.style.height = `${height}px`;
      // console.log(changeDirection, 'dir');
      // console.log(yCord, event.clientY);
      // if (height < 0 && elExists?.classList.contains('')) {
      //   // console.log('change');
      //   // setChangeDirection(1);
      //   elExists?.classList.add('up');
      // }
    };

    const onMouseUpBottomResize = (event) => {
      document.removeEventListener('mousemove', onMouseMoveBottomResize);
    };

    const onMouseDownBottomResize = (event) => {
      initial = event.clientY;
      yCord = event.clientY;
      // console.log(yCord, 'y');
      const styles = window.getComputedStyle(resizableElement);
      // setInitialHeigth(event.clientY);
      // if (!changeDirection) {
      // if (!changeDirection) {
      //   // Mouse moves down
      //   resizableElement!.style.top = styles.top;
      //   resizableElement!.style.bottom = null;
      // } else {
      //   // Mouse moves up
      //   resizableElement!.style.top = null;
      //   resizableElement!.style.bottom = styles.bottom;
      // }

      // } else {

      // }
      document.addEventListener('mousemove', onMouseMoveBottomResize);
      document.addEventListener('mouseup', onMouseUpBottomResize);
    };

    //move down event listener

    // const resizeTop = refTop.current;
    // resizeTop?.addEventListener('mousedown', onMouseDownTopResize);

    const resizeBottom = triggerRef.current;
    resizeBottom?.addEventListener('mousedown', onMouseDownBottomResize);

    return () => {
      // resizeTop?.removeEventListener('mousedown', onMouseDownTopResize);
      resizeBottom?.removeEventListener('mousedown', onMouseDownBottomResize);
    };
  }, []);

  // console.log('change dirc', changeDirection);
  return (
    <>
      <li
        key={props.i}
        className='flex gap-2 relative'
        // onClick={handleMouseMove}
      >
        {/* {isMouseDown && ( */}
        <div
          id='gogo'
          className={`w-full min-w-[15px]   left-0  bg-red-500 z-50 border rounded-md overflow-x-clip overflow-y-auto absolute`}
          // style={{ top: 0 }}
          ref={triggerRef}
          // onMouseUp={(e) => {
          //   // setIsMouseDown(false);
          //   // setHeight(50);
          //   // setTimeFrames((prev) => {
          //   //   const newState = [...prev];
          //   //   let newId = e.target.id.split('-')[1];
          //   //   newState.at(-1).end = newId;
          //   //   return newState;
          //   // });
          // }}
          // onMouseMove={(e) => {
          //   e.preventDefault();
          //   // handleMouseMove(e);
          // }}
          // onMouseDown={(e) => setInitialHeight(e.clientY)}
        >
          {/* <div
            ref={refBottom}
            className='absolute bg-green-200 bottom-0 left-0 h-2 w-[100%] cursor-row-resize'
          ></div> */}
        </div>
        {/* )} */}

        <div className='w-12 text-xs'>{props.hour}</div>
        <div
          id={`hour-${props.i}`}
          className='border w-full pb-12'
          onMouseDown={(e) => setInitialHeigth(e.clientY)}
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
