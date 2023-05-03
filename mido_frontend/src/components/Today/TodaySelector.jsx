import React, { useRef } from 'react';
import { getMonth } from '../../utils/utilities';
import "./Today.css"

const TodaySelector = ({ oneDay, chooseDate, setChooseDate }) => {
  const dateRef = useRef(null);

  const handleDateClick = () => {
    dateRef.current.click();
  };

  return (
    <div
      className='bg-gray-50 border-b text-blue-500 w-full flex justify-center items-center gap-10 fixed z-20 top-11'
      onClick={handleDateClick}
    >
      <input
        type='date'
        name='date'
        id='date'
        ref={dateRef}
        onChange={(e) => setChooseDate(e.target.value)}
        value={chooseDate}
        className='py-1 w-44 px-4 my-3 bg-gray-50 text-sm text-gray-700 border border-gray-400 rounded-md leading-tight focus:bg-white focus:outline-none hover:cursor-pointer'
      />
      <p className='font-bold text-md'>
        {oneDay?.date.split('-')[2]} {getMonth(oneDay?.date.split('-')[1][1])}{' '}
        {oneDay?.date.split('-')[0]}
      </p>
    </div>
  );
};

export default TodaySelector;
