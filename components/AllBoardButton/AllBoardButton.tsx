'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const AllBoardButton: React.FC<{ link: string }> = (props) => {
  const router = useRouter();

  return (
    <button
      className='flex  items-center justify-center gap-2 bg-gray250 hover:bg-gray200 transition-all duration-300 rounded-lg w-28 h-10 cursor-pointer'
      onClick={() => router.push(props.link)}
    >
      <section className='flex flex-col gap-[1px]'>
        {Array.from(Array(3).keys())?.map((cube) => (
          <div className='flex gap-[1px]' key={cube}>
            <div className='w-1 h-1 bg-gray300 hover:bg-white'></div>
            <div className='w-1 h-1 bg-gray300 hover:bg-white'></div>
            <div className='w-1 h-1 bg-gray300 hover:bg-white'></div>
          </div>
        ))}
      </section>
      <p className='text-gray300'>All board</p>
    </button>
  );
};

export default AllBoardButton;
