// Lib
import React from "react";

// Components
import Booking from "../Bookings/Booking.jsx";

const DayBookingsList = ({ bookings }) => {
  let content;
  if (bookings) {
    content = bookings.bookings_list?.map((book, i) => (
      <Booking key={i} book={book} />
    ));
  }

  return (
    <div className={`p-20 ${content.length ? "flex" : "hidden"} flex-wrap`}>
      {content}
    </div>
  );
};

export default DayBookingsList;
