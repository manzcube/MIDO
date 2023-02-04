import React, { memo } from 'react'
import { toast } from "react-toastify";
import { useGetActivitiesQuery } from '../../features/activities/activitySlice';
import SingleActivity from './SingleActivity';
import { useSelector } from 'react-redux';
import SignInBadge from '../Root/SignInBadge';

const MemoizedSingleActivity = memo(SingleActivity)

const ActivitiesList = () => {
  console.log('Activities LIST')
  const { data: activities, isLoading, isSuccess, isError } = useGetActivitiesQuery()
  let content;

  if (isLoading) {
    content = <SignInBadge />
  } else if (isSuccess) {
    content = activities.map(act => <MemoizedSingleActivity key={act._id} activity={act} />)
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