'use client';
import React, { useRef, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { TimeFrameItem } from 'components';

const Page = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());

  //   console.log(currentEndTime);

  const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];

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

  const removeStyles = () => {
    let elements = window.document.querySelectorAll('[id^=hour-]');

    let index = 0,
      length = elements.length;
    for (; index < length; index++) {
      elements[index].classList.remove('bg-blue500');
      elements[index].classList.add('border');
    }
  };

  const wrapperRef = useRef(null);
  const triggerRef = useRef(null);
  const [initialHeight, setInitialHeight] = useState(0);
  // const [height, setHeight] = useState(50);
  // const [lastHeight, setLastHeight] = useState(0);
  const [timeFrames, setTimeFrames] = useState<
    { start: string; end: string; id: number }[]
  >([]);

  console.log(timeFrames);
  return (
    <div className='flex gap-8 p-6 pt-24 w-full'>
      <section className=''>
        {' '}
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
                  ? '!bg-blue500 !text-white rounded-full'
                  : ''
              } ${
                selectedDay.setHours(0, 0, 0, 0) ===
                item.date.setHours(0, 0, 0, 0)
                  ? ' bg-blue500 bg-opacity-20 text-blue500 rounded-full'
                  : ''
              } flex items-center justify-center col-span-1 cursor-pointer p-2`}
              key={index}
              onClick={() => setSelectedDay(item.date)}
            >
              {item.day}
            </div>
          ))}
        </div>
      </section>
      <section className='w-1/2'>
        <ul
          className='relative'
          ref={wrapperRef}
          // onMouseMove={(e) => {
          //   setHeight(e.clientY);
          //   let heights = height - initialHeight + 50;

          //   console.log(heights, initialHeight);

          //   // setLastHeight(heights);
          //   triggerRef?.current.style.height = `${heights}px`;
          // }}
          // onMouseDown={(e) => setInitialHeight(e.clientY)}
        >
          {hours.map((hour, i) => (
            <TimeFrameItem
              hour={hour}
              i={i}
              wrapperRef={wrapperRef}
              currentHeight={initialHeight}
              setInitialHeight={setInitialHeight}
              initialHeight={initialHeight}
              triggerRef={triggerRef}
              setTimeFrames={setTimeFrames}
              timeFrames={timeFrames}
              // lastHeight={lastHeight}
            />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Page;
