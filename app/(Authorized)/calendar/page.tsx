'use client';
import React, { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const Page = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const hydrateMonth = (date: Date) => {
    const months = [];
    const firstDayOfWeek = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    ).getDay();

    let dateToStartCalendar = new Date(
      date.getFullYear(),
      date.getMonth(),
      1 - firstDayOfWeek
    );

    while (months.length < 42) {
      const day = dateToStartCalendar.getDate();
      const month =
        dateToStartCalendar.getMonth() === date.getMonth() ? 'curr' : 'prev';
      months.push({ day, month });

      dateToStartCalendar.setDate(dateToStartCalendar.getDate() + 1);
    }

    return months;
  };

  const handlePrevMonth = () => {
    setSelectedMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setSelectedMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  return (
    <div className='p-36'>
      <nav className='flex gap-2'>
        <div onClick={handlePrevMonth}>
          <ArrowLeftIcon className='w-5' />
        </div>
        <div onClick={handleNextMonth}>
          <ArrowRightIcon className='w-5' />
        </div>
      </nav>
      <h3 className='font-bold'>
        {selectedMonth.toLocaleString('default', { month: 'short' })}
        {selectedMonth.getFullYear()}
      </h3>
      <div className='grid grid-cols-7 gap-4'>
        {WEEK_DAYS.map((day, index) => (
          <div className='col-span-1' key={index}>
            {day}
          </div>
        ))}
      </div>

      <div className='grid grid-cols-7 gap-4'>
        {hydrateMonth(selectedMonth)?.map((item, index) => (
          <div
            className={`${
              item.month === 'curr' ? 'text-black' : 'text-gray-400'
            } col-span-1`}
            key={index}
          >
            {item.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
