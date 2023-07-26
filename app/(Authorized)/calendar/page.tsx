'use client';
import React, { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const Page = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());

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
      months.push({
        day,
        isCurrent: month,
        date: new Date(dateToStartCalendar),
      });
      dateToStartCalendar.setDate(dateToStartCalendar.getDate() + 1);
    }

    return months;
  };
  console.log(selectedDay);
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
    <div className='p-6 pt-24'>
      <nav className='flex gap-2'>
        <div onClick={handlePrevMonth}>
          <ArrowLeftIcon className='w-5' />
        </div>
        <div onClick={handleNextMonth}>
          <ArrowRightIcon className='w-5' />
        </div>
      </nav>
      <h3 className='font-bold flex gap-2'>
        {selectedMonth.toLocaleString('default', { month: 'long' })}{' '}
        {selectedMonth.getFullYear()}
      </h3>
      <div className='grid grid-cols-7 gap-4'>
        {WEEK_DAYS.map((day, index) => (
          <div className='col-span-1' key={index}>
            {day}
          </div>
        ))}
      </div>

      <div className='grid grid-cols-7'>
        {hydrateMonth(selectedMonth)?.map((item, index) => (
          <div
            className={`${
              item.isCurrent === 'curr' ? 'text-black' : 'text-gray-400'
            } ${
              new Date().getDate() === item.day &&
              item.isCurrent === 'curr' &&
              selectedMonth.getMonth() === new Date().getMonth()
                ? 'bg-blue500 text-white rounded-full'
                : ''
            } ${
              selectedDay.setHours(0, 0, 0, 0) ===
              item.date.setHours(0, 0, 0, 0)
                ? ' bg-teal-300 text-gray-600 rounded-full'
                : ''
            } flex items-center justify-center col-span-1 cursor-pointer p-2`}
            key={index}
            onClick={() => setSelectedDay(item.date)}
          >
            {item.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
