'use client';

import React, { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const Page = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const getDaysInMonth = (month: number, year: number) => {
    let daysFromBeginning = new Date(year, month, 1);
    let days = [];
    while (daysFromBeginning.getMonth() === month) {
      days.push(new Date(daysFromBeginning));
      daysFromBeginning.setDate(daysFromBeginning.getDate() + 1);
    }
    return days;
  };

  const hydrateMonth = (date: Date) => {
    const months = [];

    let m = 0;
    let laps = 0;
    for (let i = 0; i <= 7; ) {
      if (i === 7 && laps < 5) {
        i = 0;
        laps++;
      }
      const currentMonth = new Date(
        getDaysInMonth(date.getMonth(), date.getFullYear())[m]
      );
      if (currentMonth.getDay() === i) {
        months.push({ day: currentMonth.getDate(), month: 'curr' });
        m++;
      } else if (laps <= 2) {
        let prevMonth = getDaysInMonth(
          date.getMonth() === 0 ? 11 : date.getMonth() - 1,
          date.getMonth() === 0 ? date.getFullYear() - 1 : date.getFullYear()
        ).slice(-7);

        const prevDate = prevMonth
          .find((item) => item.getDay() === i)
          ?.getDate();
        months.push({ day: prevDate, month: 'prev' });
      } else {
        let nextMonth = getDaysInMonth(
          date.getMonth() === 11 ? 0 : date.getMonth() + 1,
          date.getMonth() === 11 ? date.getFullYear() + 1 : date.getFullYear()
        ).slice(0, 12);

        console.log(date.getMonth());
        const firstDate = nextMonth
          .filter((item) => item.getDay() === i)[0]
          ?.getDate();

        if (!months.slice(-10).some((item) => item.day === firstDate)) {
          months.push({ day: firstDate, month: 'next' });
        } else {
          const secondDate = nextMonth
            .filter((item) => item.getDay() === i)[1]
            ?.getDate();
          months.push({ day: secondDate, month: 'next' });
        }
      }
      i++;
    }

    return months;
  };

  console.log(hydrateMonth(selectedMonth));

  return (
    <div className='p-36'>
      <nav className='flex gap-2'>
        <div
          onClick={() =>
            setSelectedMonth((prev) => {
              return new Date(prev.setMonth(prev.getMonth() - 1));
            })
          }
        >
          <ArrowLeftIcon className='w-5' />
        </div>
        <div
          onClick={() =>
            setSelectedMonth((prev) => {
              return new Date(prev.setMonth(prev.getMonth() + 1));
            })
          }
        >
          <ArrowRightIcon className='w-5' />
        </div>
      </nav>
      <h3 className='font-bold'>
        {selectedMonth.toLocaleString('default', { month: 'short' })}
        {selectedMonth.getFullYear()}
      </h3>
      <div className='grid grid-cols-7 gap-4'>
        <div className=' col-span-1'>S</div>
        <div className=' col-span-1'>M</div>
        <div className=' col-span-1'>T</div>
        <div className=' col-span-1'>W</div>
        <div className=' col-span-1'>T</div>
        <div className=' col-span-1'>F</div>
        <div className=' col-span-1'>S</div>
      </div>

      <div className='grid grid-cols-7 gap-4'>
        {hydrateMonth(selectedMonth)?.map((item, i) => (
          <>
            <div
              className={`${
                item.month === 'curr' ? 'text-black' : 'text-gray-400'
              } col-span-1`}
              key={i}
            >
              {item.day}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Page;
