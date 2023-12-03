// Lib
import React from "react";
import "./Today.css";

// Components
import SmallWorker from "../Worker/SmallWorker.jsx";

const DayWorkersList = ({ workers }) => {
  // Sort workers
  const sortedWorkers = [...workers].sort((a, b) => {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();
    return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
  });

  let content = sortedWorkers.map((worker) => (
    <SmallWorker key={worker._id} draggable={true} worker={worker} />
  ));

  return (
    <div
      className="flex fixed top-20 -mt-2 z-20 w-full shadow-md bg-white overflow-x-scroll"
      id="today-workers-list"
    >
      {content}
    </div>
  );
};

export default DayWorkersList;
