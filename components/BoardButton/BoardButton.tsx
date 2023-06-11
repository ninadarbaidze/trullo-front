'use client';
import React from 'react';

const BoardButton: React.FC<{
  link: (...args: any) => any;
  cubeNumber?: number;
  buttonText: string;
  cubeBorderStyle?: string;
}> = (props) => {
  return (
    <button
      className='flex  items-center justify-center gap-2 bg-gray250 hover:bg-gray200 transition-all duration-300 rounded-lg w-28 h-10 cursor-pointer'
      onClick={() => props.link()}
    >
      <section className='flex flex-col gap-[1px]'>
        {Array.from(Array(props.cubeNumber).keys())?.map((cube) => (
          <div className='flex gap-[1px]' key={cube}>
            <div
              className={`${props.cubeBorderStyle} w-1 h-1 bg-gray300 hover:bg-white`}
            ></div>
            <div
              className={`${props.cubeBorderStyle} w-1 h-1 bg-gray300 hover:bg-white`}
            ></div>
            <div
              className={`${props.cubeBorderStyle} w-1 h-1 bg-gray300 hover:bg-white`}
            ></div>
          </div>
        ))}
      </section>
      <p className='text-gray300'>{props.buttonText}</p>
    </button>
  );
};

export default BoardButton;
