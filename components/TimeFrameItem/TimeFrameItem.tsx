import { BoardButton } from 'components/BoardButton';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const TimeFrameItem = (props) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [initialHeight, setInitialHeigth] = useState(0);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const triggerRef = useRef(null);

  const createDivElement = (
    top: number | null,
    height: number,
    bottom: number | null
  ) => {
    const myDiv = document.createElement('div');
    myDiv.style.backgroundColor = '#2F80ED';
    myDiv.style.borderRadius = '6px';
    if (top) {
      myDiv.style.top = `${top}px`;
    } else {
      myDiv.style.bottom = `${bottom}`;
    }

    myDiv!.style.left = '50px';

    myDiv.style.height = `${height}px`;
    myDiv.style.width = `100%`;

    myDiv.style.position = 'absolute';

    const slotList = document.getElementById('timeslots');

    slotList?.appendChild(myDiv);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setInitialHeigth(e.pageY);
    setIsMouseDown(true);

    if (e.target.id === `${props.hour}`) {
      props.setTimeFrames((prev) => {
        const newState = [...prev];

        let obj = {
          id: prev.length > 0 ? prev?.at(-1)?.id + 1 : 1,
          start: props.hour,
        };
        return newState.concat(obj);
      });
    }
  };

  const handleMouseUp = useCallback(
    (e, end, start) => {
      // console.log(start, 'propsstart');
      e.preventDefault();
      setIsMouseDown(false);

      props.setTimeFrames((prev) => {
        const newState = [...prev];
        {
          if (!start && end) {
            console.log('first');
            newState.at(-1).end = end;
            end = '';
          } else {
            console.log('second');

            // console.log(props.hour, 'end');
            // if (newState.length > 0) {
            newState.at(-1).end = props.hour;
            newState.at(-1).start = start;
            // }

            start = '';
          }
        }

        return newState;
      });
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

      let end = '';
      let start = '';

      resizableElement!.style.left = '50px';

      const onMouseMoveBottomResize = (event) => {
        if (!isMouseDown) {
          // If isMouseDown is false, stop the execution of the function
          return;
        }
        event.preventDefault();

        const dy = event.pageY - yCord;
        if (initial < event.pageY) {
          if (event.target.id) {
            end = event.target.id;
          }
          bottomHeight = 0;

          topHeight = topHeight + dy;
          resizableElement!.style.top = `${initialHeight - 96}px`;
          resizableElement!.style.bottom = null;
          resizableElement!.style.height = `${topHeight}px`;
        } else {
          if (event.target.id) {
            console.log(start, 'target id');
            start = event.target.id;
          }
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
        setIsMouseDown(false);
        props.setTimeFrames((prev) => {
          const newState = [...prev];
          if (topHeight) {
            newState.at(-1).top = initialHeight - 96;
            newState.at(-1).bottom = null;
            newState.at(-1).height = topHeight;
            createDivElement(initialHeight - 96, topHeight, null);
            handleMouseUp(event, end, false);
          } else {
            newState.at(-1).top = null;
            newState.at(-1).bottom = styles.bottom;
            newState.at(-1).height = bottomHeight;

            createDivElement(null, bottomHeight, styles.bottom);
            handleMouseUp(event, end, start);
          }

          return newState;
        });
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
  }, [initialHeight, isMouseDown]);

  const setOneHourSlotHandler = () => {
    setDialogIsOpen(true);
  };

  return (
    <>
      {isMouseDown && (
        <div
          className={`w-full min-w-[15px] left-0  bg-blue500 z-50 border rounded-md overflow-x-clip overflow-y-auto absolute`}
          ref={triggerRef}
        ></div>
      )}
      <li
        key={props.i}
        className={`flex h-3 ${
          props.hour.slice(3, 5) === '00' ? 'relative' : ''
        } `}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={() => setOneHourSlotHandler()}
        style={props.hour.slice(3, 5) === '00' ? { position: 'relative' } : {}}
      >
        {props.hour.slice(3, 5) === '00' && (
          <div className='w-12 text-xs text-gray-500 -pt-2'>{props.hour}</div>
        )}

        {dialogIsOpen && <div className='sticky top-0'>dsssss</div>}

        <div
          id={`${props.hour}`}
          className={` w-full mb-[7px]  ${
            props.hour.slice(3, 5) === '00' ? 'border-b ' : ''
          }`}
        >
          {' '}
        </div>
      </li>
    </>
  );
};

export default TimeFrameItem;
