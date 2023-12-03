// Lib
import React, { memo } from "react";

// Components
import SmallActivity from "../Activity/SmallActivity";

// Memo
const MemoizedSmallActivity = memo(SmallActivity);

const DayActivitiesList = ({ activities }) => {
  const sorted = [...activities];
  sorted.sort(function (a, b) {
    if (a.color < b.color) {
      return -1;
    }
    if (a.color > b.color) {
      return 1;
    }
    return 0;
  });

  let content = sorted.map((act) => (
    <MemoizedSmallActivity key={act._id} activity={act} />
  ));
  return content?.length ? (
    <div className="flex flex-col fixed -right-4 top-36 p-1 border-l h-screen border-gray-300 overflow-y-scroll bg-white grabbable">
      <h1 className="text-center text-gray-800 font-bold text-xs mt-4 px-4 underline">
        Activities
      </h1>
      {content}
    </div>
  ) : null;
};

export default DayActivitiesList;
