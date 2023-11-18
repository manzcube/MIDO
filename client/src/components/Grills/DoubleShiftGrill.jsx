import React from "react";

import Grill from "./Grill";

const DoubleShiftGrill = ({ drop, oneDay, bookings }) => {
  const filteredBookings = (schedule) =>
    bookings.bookings_list?.filter((book) => book.start_at === schedule);

  return (
    <>
      <Grill
        drop={drop}
        oneDay={oneDay}
        bookings={filteredBookings("8")}
        schedule="08:30-10:30"
        group="A"
      />
      <Grill
        drop={drop}
        oneDay={oneDay}
        bookings={filteredBookings("9")}
        schedule="09:30-11:30"
        group="B"
      />
      <Grill
        drop={drop}
        oneDay={oneDay}
        bookings={filteredBookings("11")}
        schedule="11:00-13:00"
        group="A"
      />
      <Grill
        drop={drop}
        oneDay={oneDay}
        bookings={filteredBookings("12")}
        schedule="12:00-14:00"
        group="B"
      />
      <Grill
        drop={drop}
        oneDay={oneDay}
        bookings={filteredBookings("14")}
        schedule="14:30-16:30"
        group="A"
      />
      <Grill
        drop={drop}
        oneDay={oneDay}
        bookings={filteredBookings("15")}
        schedule="15:30-17:30"
        group="B"
      />
      <Grill
        drop={drop}
        oneDay={oneDay}
        bookings={filteredBookings("17")}
        schedule="17:00-19:00"
        group="A"
      />
      <Grill
        drop={drop}
        oneDay={oneDay}
        bookings={filteredBookings("18")}
        schedule="18:00-20:00"
        group="B"
      />
    </>
  );
};

export default DoubleShiftGrill;
