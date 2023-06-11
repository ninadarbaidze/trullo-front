import React from 'react';

const BoardSkeleton = () => {
  return (
    <div className='flex flex-row py-28  text-black  px-8 overflow-clip w-full '>
      <ul className='flex bg-babyBlue rounded-xl w-screen'>
        <li className='flex flex-col gap-2 p-5 relative'>
          <div className='bg-blue500 bg-opacity-20 animate-pulse rounded-md w-[60%] mt-2 h-8' />
          <div className='flex flex-col w-60'>
            <div className='flex flex-col  flex-grow'>
              <ul className='flex flex-col'>
                <li className='bg-blue500 bg-opacity-10 pb-28 px-2 rounded-xl shadow-md mb-4 relative'></li>
              </ul>
            </div>
          </div>
        </li>
        <li className='flex flex-col gap-2 p-5 relative'>
          <div className='bg-blue500 bg-opacity-20 animate-pulse rounded-md w-[80%] mt-2 h-8' />
          <div className='flex flex-col w-60'>
            <div className='flex flex-col  flex-grow'>
              <ul className='flex flex-col'>
                <li className='bg-blue500 bg-opacity-10 pb-28 px-2 rounded-xl shadow-md mb-4 relative'></li>
                <li className='bg-blue500 bg-opacity-10 pb-28 px-2 rounded-xl shadow-md mb-4 relative'></li>
              </ul>
            </div>
          </div>
        </li>
        <li className='flex flex-col gap-2 p-5 relative'>
          <div className='bg-blue500 bg-opacity-20 animate-pulse rounded-md w-[40%] mt-2 h-8' />
          <div className='flex flex-col w-60'>
            <div className='flex flex-col  flex-grow'>
              <ul className='flex flex-col'>
                <li className='bg-blue500 bg-opacity-10 pb-28 px-2 rounded-xl shadow-md mb-4 relative'></li>
              </ul>
            </div>
          </div>
        </li>
        <li className='flex flex-col gap-2 p-5 relative'>
          <div className='bg-blue500 bg-opacity-20 animate-pulse rounded-md w-[55%] h-8' />
          <div className='flex flex-col w-60'>
            <div className='flex flex-col  flex-grow'>
              <ul className='flex flex-col'>
                <li className='bg-blue500 bg-opacity-10 pb-28 px-2 rounded-xl shadow-md mb-4 relative'></li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default BoardSkeleton;
