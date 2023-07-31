import { BoardButton } from 'components/BoardButton';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const TimeFrameItem = (props) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const triggerRef = useRef(null);
  const listRef = useRef(null);

  const [initialHeight, setInitialHeigth] = useState(0);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setInitialHeigth(e.clientY);
    setIsMouseDown(true);

    if (+e.target.id == props.hour) {
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
    (e) => {
      e.preventDefault();
      setIsMouseDown(false);
      // console.log(listRef);
      console.log(e.target.id);
      if (+e.target.id == props.hour) {
        // Handle mouse up on the specific div (id={`hour-${props.i}`})
        // Here, you can update state or do anything specific to this div.
        props.setTimeFrames((prev) => {
          const newState = [...prev];
          newState.at(-1).end = props.hour;
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

      resizableElement!.style.left = '50px';

      const onMouseMoveBottomResize = (event) => {
        event.preventDefault();
        console.log('logloglog');
        const dy = event.clientY - yCord;
        if (initial < event.clientY) {
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

        yCord = event.clientY;
      };

      const onMouseUpBottomResize = (event) => {
        console.log('up');
        handleMouseUp(event);
        props.setTimeFrames((prev) => {
          const newState = [...prev];
          const endDateNotExists = newState.find(
            (item) => item.start && !item.end
          );
          if (endDateNotExists) {
            endDateNotExists.end = endDateNotExists.start + 1;
          }
          return newState;
        });
        document.removeEventListener('mousemove', onMouseMoveBottomResize);
      };

      const onMouseDownBottomResize = (event) => {
        initial = event.clientY;
        yCord = event.clientY;
        console.log('down');

        document.addEventListener('mousemove', onMouseMoveBottomResize);
        document.addEventListener('mouseup', onMouseUpBottomResize);
      };
      onMouseDownBottomResize(event);

      const resizeBottom = triggerRef.current;
      resizeBottom?.addEventListener('mousedown', onMouseDownBottomResize);

      return () => {
        resizeBottom?.removeEventListener('mousedown', onMouseDownBottomResize);
        resizeBottom?.removeEventListener('mousemove', onMouseMoveBottomResize);
      };
    }
  }, [handleMouseUp, initialHeight, isMouseDown, props]);

  return (
    <>
      <li
        key={props.i}
        className='flex gap-2'
        ref={listRef}
        id={props.hour}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {isMouseDown && (
          <div
            className={`w-full min-w-[15px]  left-0  bg-red-500 z-50 border rounded-md overflow-x-clip overflow-y-auto absolute`}
            // style={{ top: initialHeight - 96 }}
            ref={triggerRef}
          ></div>
        )}
        <div className='w-12 text-xs'>{props.hour}</div>
        <div className='border w-full pb-12'>
          {/* {timeFrames.at(-1)?.start == hour && (
      <p>{`${timeFrames.at(-1)?.start} - ${currentEndTime}`}</p>
    )} */}
        </div>
      </li>
    </>
  );
};

export default TimeFrameItem;
