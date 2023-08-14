import React, { useRef } from "react";
import { getMonth } from "../../utils/utilities";
import "./Today.css";

const TodaySelector = ({ currentDate, setCurrentDate }) => {
  const dateRef = useRef(null);

  const handleDateClick = () => {
    dateRef.current.click();
  };

  return (
    <div
      className="bg-gray-50 text-blue-500 w-full flex justify-center items-center gap-10 fixed z-30 top-10 border-b border-black"
      onClick={handleDateClick}
    >
      <input
        type="date"
        name="date"
        id="date"
        ref={dateRef}
        onChange={(e) => setCurrentDate(e.target.value)}
        value={currentDate}
        className="py-1 w-44 px-4 my-1 bg-gray-50 text-xs text-gray-700 border border-gray-400 rounded-md leading-tight focus:bg-white focus:outline-none hover:cursor-pointer"
      />
      <p className="font-bold text-sm">
        {currentDate.split("-")[2]} {getMonth(currentDate.split("-")[1][1])}{" "}
        {currentDate.split("-")[0]}
      </p>
    </div>
  );
};

export default TodaySelector;
