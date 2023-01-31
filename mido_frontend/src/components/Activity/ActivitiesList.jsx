import React, { memo } from 'react'
import { toast } from "react-toastify";
import { useGetActivitiesQuery } from '../../features/activities/activitySlice';
import SingleActivity from './SingleActivity';

const MemoizedSingleActivity = memo(SingleActivity)

const ActivitiesList = () => {
  console.log('Activities LIST')
  const { data: activities, isLoading, isSuccess, isError, error} = useGetActivitiesQuery()
  let content;

  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isSuccess) {
    content = activities.map(act => <MemoizedSingleActivity key={act._id} activity={act} />)
  } else if (isError) {
    content = "No Content";
    return toast.error(error.data)
  }
  
    
  return (
    <div className='flex flex-col'>
        {content}
    </div>
  )
}

export default ActivitiesList