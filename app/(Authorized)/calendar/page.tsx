'use client';
import React, { useRef, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { TimeFrameItem } from 'components';

const Page = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());

  //   console.log(currentEndTime);

  const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const hoursWithAdditionalTimes = [
    '00:00',
    '00:15',
    '00:30',
    '00:45', // For 0 (midnight)
    '01:00',
    '01:15',
    '01:30',
    '01:45', // For 1 AM
    '02:00',
    '02:15',
    '02:30',
    '02:45', // For 2 AM
    '03:00',
    '03:15',
    '03:30',
    '03:45', // For 3 AM
    '04:00',
    '04:15',
    '04:30',
    '04:45', // For 4 AM
    '05:00',
    '05:15',
    '05:30',
    '05:45', // For 5 AM
    '06:00',
    '06:15',
    '06:30',
    '06:45', // For 6 AM
    '07:00',
    '07:15',
    '07:30',
    '07:45', // For 7 AM
    '08:00',
    '08:15',
    '08:30',
    '08:45', // For 8 AM
    '09:00',
    '09:15',
    '09:30',
    '09:45', // For 9 AM
    '10:00',
    '10:15',
    '10:30',
    '10:45', // For 10 AM
    '11:00',
    '11:15',
    '11:30',
    '11:45', // For 11 AM
    '12:00',
    '12:15',
    '12:30',
    '12:45', // For 12 PM (noon)
    '13:00',
    '13:15',
    '13:30',
    '13:45', // For 1 PM
    '14:00',
    '14:15',
    '14:30',
    '14:45', // For 2 PM
    '15:00',
    '15:15',
    '15:30',
    '15:45', // For 3 PM
    '16:00',
    '16:15',
    '16:30',
    '16:45', // For 4 PM
    '17:00',
    '17:15',
    '17:30',
    '17:45', // For 5 PM
    '18:00',
    '18:15',
    '18:30',
    '18:45', // For 6 PM
    '19:00',
    '19:15',
    '19:30',
    '19:45', // For 7 PM
    '20:00',
    '20:15',
    '20:30',
    '20:45', // For 8 PM
    '21:00',
    '21:15',
    '21:30',
    '21:45', // For 9 PM
    '22:00',
    '22:15',
    '22:30',
    '22:45', // For 10 PM
    '23:00',
    '23:15',
    '23:30',
    '23:45', // For 11 PM
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
  >([{ start: '', end: '', id: null }]);

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
          id='timeslots'
          // onMouseMove={(e) => {
          //   setHeight(e.clientY);
          //   let heights = height - initialHeight + 50;

          //   console.log(heights, initialHeight);

          //   // setLastHeight(heights);
          //   triggerRef?.current.style.height = `${heights}px`;
          // }}
          // onMouseDown={(e) => setInitialHeight(e.clientY)}
        >
          {hoursWithAdditionalTimes.map((hour, i) => (
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
