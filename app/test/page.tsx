'use client';
import React, { useEffect, useRef } from 'react';

const Page = () => {
  const refBox = useRef(null);
  const refTop = useRef(null);
  const refBottom = useRef(null);

  useEffect(() => {
    const resizableElement = refBox.current;
    const styles = window.getComputedStyle(resizableElement);
    let width = parseInt(styles.width, 10);
    let height = parseInt(styles.height, 10);
    let xCord = 0;
    let yCord = 0;
    // resizableElement!.style.top = '150px';
    // resizableElement!.style.left = '150px';

    //TOP
    const onMouseMoveTopResize = (event) => {
      const dy = event.clientY - yCord;
      height = height - dy;
      yCord = event.clientY;
      resizableElement!.style.height = `${height}px`;
    };
    const onMouseUpTopResize = (event) => {
      document.removeEventListener('mousemove', onMouseMoveTopResize);
    };

    const onMouseDownTopResize = (event) => {
      yCord = event.clientY;
      const styles = window.getComputedStyle(resizableElement);
      resizableElement!.style.bottom = styles.bottom;
      resizableElement!.style.top = null;
      document.addEventListener('mousemove', onMouseMoveTopResize);
      document.addEventListener('mouseup', onMouseUpTopResize);
    };

    //BOTTOM

    const onMouseMoveBottomResize = (event) => {
      const dy = event.clientY - yCord;
      height = height + dy;
      yCord = event.clientY;
      resizableElement!.style.height = `${height}px`;
    };

    const onMouseUpBottomResize = (event) => {
      document.removeEventListener('mousemove', onMouseMoveBottomResize);
    };

    const onMouseDownBottomResize = (event) => {
      yCord = event.clientY;
      const styles = window.getComputedStyle(resizableElement);
      resizableElement!.style.bottom = null;
      resizableElement!.style.top = styles.top;
      document.addEventListener('mousemove', onMouseMoveBottomResize);
      document.addEventListener('mouseup', onMouseUpBottomResize);
    };

    //move down event listener

    const resizeTop = refTop.current;
    resizeTop?.addEventListener('mousedown', onMouseDownTopResize);

    const resizeBottom = refBottom.current;
    resizeBottom?.addEventListener('mousedown', onMouseDownBottomResize);

    return () => {
      resizeTop?.removeEventListener('mousedown', onMouseDownTopResize);
      resizeBottom?.removeEventListener('mousedown', onMouseDownBottomResize);
    };
  }, []);

  return (
    <div className='relative w-[100vw] h-[100vh] !bg-teal-400'>
      <div
        id='res'
        ref={refBox}
        className='absolute border min-w-[15px] min-h-[15px]  border-red-600 w-36 h-36 flex items-center justify-center'
      >
        <div
          ref={refTop}
          className='absolute bg-green-200 top-0 left-0 h-2 w-[100%] cursor-row-resize'
        ></div>
        <div
          ref={refBottom}
          className='absolute bg-green-200 bottom-0 left-0 h-2 w-[100%] cursor-row-resize'
        ></div>
      </div>
      <div className='relative top-36 bg-white w-96 h-96'>
        <div className='absolute top-0 left-0 w-12 h-12 bg-green-700'></div>
      </div>
    </div>
  );
};

export default Page;
