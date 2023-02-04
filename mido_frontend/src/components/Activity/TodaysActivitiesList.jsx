import React from 'react'
import { useGetActivitiesQuery } from '../../features/activities/activitySlice';
import SignInBadge from '../Root/SignInBadge';

const SmallSingleActivity = ({activity}) => {
    const dataToDrag = {
      type: "activity",
      id: activity._id,
      title: activity.title,
      color: activity.color,
      duration: activity.duration,
    }

    const onGrab = (e) => {
      e.dataTransfer.setData("text", JSON.stringify(dataToDrag))
    }

    return (
        <div id={activity._id} draggable onDragStart={e => onGrab(e)} className={`${activity.color} flex flex-col justify-between p-3 rounded-md my-4 max-w-md shadow-md cursor-grab`}>
            <div className='flex justify-between items-center mb-2'>
                <p className='p-1 uppercase font-bold text-gray-800'>{activity.title}</p>
                
            </div>
            <div className='flex justify-between'>
                <p className='p-1 m-2 text-sm text-gray-600'>Duration: {activity.duration}</p>
            </div>
        </div>
    )
}

const ActivitiesList = () => {
  const { data: activities, isLoading, isSuccess, isError } = useGetActivitiesQuery()
  let content;

  if (isLoading) {
    content = <SignInBadge />
  } else if (isSuccess) {
    content = activities.map(act => <SmallSingleActivity key={act._id} activity={act} />)
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