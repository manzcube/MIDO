// Lib
import React, { memo } from 'react';

// Endpoint
import { useGetActivitiesQuery } from '../../features/activities/activitySlice';

// Components
import SignInBadge from "../Root/SignInBadge.jsx"
import SmallActivity from "../Activity/SmallActivity";

// Memo
const MemoizedSmallActivity = memo(SmallActivity)

const TodayActivitiesList = () => {
  // Query
  const { data: activities, isLoading, isSuccess, isError } = useGetActivitiesQuery()
  let content;

  if (isLoading) {
    content = <SignInBadge />
  } else if (isSuccess) {
    const sorted = [...activities]
    sorted.sort(function(a, b) {
      if (a.color < b.color) {
        return -1;
      }
      if (a.color > b.color) {
        return 1;
      }
      return 0;
    });
    content = sorted.map(act => <MemoizedSmallActivity key={act._id} activity={act} />)
  } else if (isError) {
    content = "Sign in please"
  }
  return (
    <div className='flex flex-col fixed z-20 mt-10 -right-5 p-3 w-44 border-l overflow-y-scroll border-b-2 bg-white grabbable rightColumn'>
      <h1 className='text-center text-gray-800 font-bold text-sm underline'>Activities</h1>
      {content}
    </div>
  )
}

export default TodayActivitiesList