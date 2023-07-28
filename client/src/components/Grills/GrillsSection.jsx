import React, { useState } from "react";
import "./Grills.css";

// Components
import SingleShiftGrill from "./DoubleShiftGrill";
import DoubleShiftGrill from "./SingleShiftGrill";

const GrillsSection = ({ bookings, oneDay, drop, shift, setShift }) => {
  const styled =
    "mx-2 bg-gray-700 text-white p-2 rounded shadow-lg focus:bg-white focus:text-gray-700 inner-shadow focus:cursor-not-allowed focus:border-gray-700 text-xs transition-all duration-500";
  return (
    <>
      <p className="p-16">
        {/* <button className={styled} onClick={() => setShift(true)}>un turno</button> */}
        <button className={styled} onClick={() => setShift(true)}>
          doble turno
        </button>
      </p>
      {shift ? (
        <SingleShiftGrill bookings={bookings} oneDay={oneDay} drop={drop} />
      ) : (
        <DoubleShiftGrill bookings={bookings} oneDay={oneDay} drop={drop} />
      )}
    </>
  );
};

export default GrillsSection;
