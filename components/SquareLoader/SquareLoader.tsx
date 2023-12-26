import React from 'react';

const SquareLoader: React.FC<{ size: string; className?: string }> = (
  props
) => {
  return (
    <div
      className={`${props.className} flex flex-col items-center justify-center gap-1`}
    >
      <div className='flex gap-1'>
        <div
          className={`${props.size} bg-blue500 bg-opacity-30 animate-pulse rounded-e-md`}
        ></div>
        <div
          className={`${props.size} bg-blue500 bg-opacity-40 animate-pulse rounded-s-md`}
        ></div>
      </div>
      <div className='flex gap-1'>
        <div
          className={`${props.size} bg-blue500 bg-opacity-50 animate-pulse rounded-e-md`}
        ></div>
        <div
          className={`${props.size} bg-blue500 bg-opacity-60 animate-pulse rounded-s-md`}
        ></div>
      </div>
    </div>
  );
};

export default SquareLoader;
