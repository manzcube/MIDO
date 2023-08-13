import React from "react";

// Components
import Entry from "./Entry";

const Grill = ({ bookings, oneDay, schedule, drop, group }) => {
  const sch = schedule.split("-")[0];
  // const filteredBookings = bookings?.bookings_list.filter(
  //   (book) => book.start_at === sch.split(":")[0]
  // );
  const filteredActitvites = oneDay.activities.filter(
    (act) => act.schedule === sch
  );

  return (
    <div className="mt-10">
      <p className="text-sm font-bold m-2 text-gray-700">
        {schedule}
        {group ? (
          <span
            className={`${
              group === "A" ? "text-blue-400" : "text-red-400"
            } flex gap-2`}
          >
            Group {group}
          </span>
        ) : (
          ""
        )}
      </p>
      <div
        id="dropDiv"
        onDrop={(e) => drop(e, sch)}
        onDragOver={(e) => e.preventDefault()}
        className="flex flex-col items-center p-3 m-5 border border-gray-200 rounded-lg bg-white"
      >
        {filteredActitvites.length ? (
          filteredActitvites.map((act) => (
            <Entry
              bookings={bookings}
              key={act._id}
              activity={act}
              dayId={oneDay.id}
            />
          ))
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-500 my-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default Grill;
