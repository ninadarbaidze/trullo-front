'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const AllBoardButton: React.FC<{ link: string }> = (props) => {
  const router = useRouter();

  return (
    <button
      className='flex  items-center justify-center gap-2 bg-gray250 rounded-lg w-28 h-10 cursor-pointer'
      onClick={() => router.push(props.link)}
    >
      <section className='flex flex-col gap-[1px]'>
        {Array.from(Array(3).keys())?.map((cube) => (
          <div className='flex gap-[1px]' key={cube}>
            <div className='w-1 h-1 bg-gray300'></div>
            <div className='w-1 h-1 bg-gray300'></div>
            <div className='w-1 h-1 bg-gray300'></div>
          </div>
        ))}
      </section>
      <p className='text-gray300'>All board</p>
    </button>
  );
};

export default AllBoardButton;
