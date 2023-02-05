// Lib
import React, { memo } from 'react';
import "./Activity.css"

// Endpoint
import { useGetActivitiesQuery } from '../../features/activities/activitySlice';

// Components
import SingleActivity from './SingleActivity';
import SignInBadge from '../Root/SignInBadge';

// Memo
const MemoizedSingleActivity = memo(SingleActivity)

const ActivitiesList = () => {
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
    content = sorted.map(act => <MemoizedSingleActivity key={act._id} activity={act} />)
  } else if (isError) {
    content = "Sign in please"
  }
    
  return (
    <div className='flex flex-col overflow-y-scroll activitiesList border rounded-md p-4'>
        {content}
    </div>
  )
}

export default ActivitiesList