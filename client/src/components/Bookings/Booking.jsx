import React from "react";

const Booking = ({ book }) => {
  const values = book.values;

  return (
    <div>
      <div className={`m-3 rounded border-black border p-2 text-xs`}>
        <p className="w-full flex justify-between gap-2">
          <span>{book.activity}</span>
          <span>
            {book.number_of_people} {values[0][1]}
          </span>
        </p>
        {values.map((each) => (
          <p className="w-full flex justify-between gap-2">
            <span>{each[0]}</span>
            <span>{each[1]}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Booking;
