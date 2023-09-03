// Lib
import React, { memo } from "react";
import "./Activity.css";

// Endpoint
import { useGetActivitiesQuery } from "../../features/activities/activitySlice";

// Components
import SingleActivity from "./SingleActivity";
import SignInBadge from "../Root/SignInBadge";

// Memo
const MemoizedSingleActivity = memo(SingleActivity);

const ActivitiesList = ({ activities }) => {
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

  return (
    <div className="flex flex-wrap gap-5">
      {sorted.map((act) => (
        <MemoizedSingleActivity key={act._id} activity={act} />
      ))}
    </div>
  );
};

export default ActivitiesList;
