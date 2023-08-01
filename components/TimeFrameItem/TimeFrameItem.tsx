import { BoardButton } from 'components/BoardButton';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const TimeFrameItem = (props) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const triggerRef = useRef(null);

  const [initialHeight, setInitialHeigth] = useState(0);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setInitialHeigth(e.pageY);
    setIsMouseDown(true);

    if (e.target.id === `${props.i}`) {
      // Handle mouse down on the specific div (id={`hour-${props.i}`})
      // Here, you can update state or do anything specific to this div.
      props.setTimeFrames((prev) => {
        const newState = [...prev];
        let obj = {
          id: prev.length > 0 ? prev?.at(-1)?.id + 1 : 1,
          start: props.hour,
        };
        return newState.concat(obj);
      });
    }
    // If the event originated from the triggerRef <div>, it will be handled inside the useEffect.
  };

  const handleMouseUp = useCallback(
    (e, end) => {
      // console.log('end', end);
      e.preventDefault();
      setIsMouseDown(false);
      // console.log(e.target.id);
      if (end) {
        // Handle mouse up on the specific div (id={`hour-${props.i}`})
        // Here, you can update state or do anything specific to this div.
        props.setTimeFrames((prev) => {
          const newState = [...prev];
          newState.at(-1).end = end;
          return newState;
        });
      }
      // If the event originated from the triggerRef <div>, it was handled inside the useEffect.
    },
    [props]
  );

  useEffect(() => {
    if (isMouseDown) {
      const resizableElement = triggerRef.current;
      const styles = window.getComputedStyle(resizableElement);
      let topHeight = parseInt(styles.height, 10);
      let bottomHeight = parseInt(styles.height, 10);
      let yCord = 0;
      let initial = 0;

      let end = 0;

      resizableElement!.style.left = '50px';

      const onMouseMoveBottomResize = (event) => {
        if (!isMouseDown) {
          // If isMouseDown is false, stop the execution of the function
          return;
        }
        event.preventDefault();
        if (event.target.id) {
          end = +event.target.id;
        }
        console.log('move');
        const dy = event.pageY - yCord;
        if (initial < event.pageY) {
          bottomHeight = 0;

          topHeight = topHeight + dy;
          resizableElement!.style.top = `${initialHeight - 96}px`;
          resizableElement!.style.bottom = null;
          resizableElement!.style.height = `${topHeight}px`;
        } else {
          topHeight = 0;
          bottomHeight = bottomHeight - dy;
          resizableElement!.style.bottom = `${styles.bottom}`;
          resizableElement!.style.top = null;
          resizableElement!.style.height = `${bottomHeight}px`;
        }

        yCord = event.pageY;
      };

      // document.addEventListener('mousemove', onMouseMoveBottomResize);
      const onMouseUpBottomResize = (event) => {
        console.log('up');
        setIsMouseDown(false);

        handleMouseUp(event, end);
        document.removeEventListener('mousemove', onMouseMoveBottomResize);
      };

      const onMouseDownBottomResize = (event) => {
        initial = event.pageY;
        yCord = event.pageY;

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
  }, [handleMouseUp, initialHeight, isMouseDown]);

  return (
    <>
      {isMouseDown && (
        <div
          className={`w-full min-w-[15px]  left-0  bg-red-500 z-50 border rounded-md overflow-x-clip overflow-y-auto absolute`}
          ref={triggerRef}
        ></div>
      )}
      <li
        key={props.i}
        className='flex gap-2 relative'
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className='w-12 text-xs'>{props.hour}</div>
        <div id={`${props.i}`} className='border w-full pb-12'>
          {/* {timeFrames.at(-1)?.start == hour && (
      <p>{`${timeFrames.at(-1)?.start} - ${currentEndTime}`}</p>
    )} */}
        </div>
      </li>
    </>
  );
};

export default TimeFrameItem;
