// Lib
import React, { memo } from 'react';

// Endpoint
import { useGetActivitiesQuery } from '../../features/activities/activitySlice';

// Components
import SignInBadge from "../Root/SignInBadge.jsx"
import SmallActivity from "./SmallActivity";

// Memo
const MemoizedSmallActivity = memo(SmallActivity)

const ActivitiesList = () => {
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
    <div className='flex flex-col'>
        {content}
    </div>
  )
}

export default ActivitiesList