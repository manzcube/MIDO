import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDeleteActivityMutation } from '../../features/activities/activitySlice'
import { toast } from 'react-toastify'

const SingleActivity = ({activity}) => {
    const [sureToDelete, setSureToDelete] = useState(false)
    const [deleteActivity, { isLoading }] = useDeleteActivityMutation()
    const canDelete = activity?._id && !isLoading;

    const onDeleteActivty = async() => {
        if(canDelete) {
            try {
                await deleteActivity(activity._id).unwrap()
                toast.success("actvity deleted")
            } catch (err) {
                toast.error(err.data)
            }
        }        
    }

    return (
        <div className={`${activity.color} flex flex-col justify-between p-3 rounded-md my-4 max-w-md`}>
            <div className='flex justify-between items-center mb-2'>
                <p className='p-1 uppercase font-bold text-gray-800'>{activity.title}</p>
                <span className='space-x-3 flex items-center'>
                    <Link to={`/activities/edit/${activity._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </Link>
                    {
                        sureToDelete ? (
                            <button onClick={onDeleteActivty} className='py-1 px-2 rounded-md bg-red-500 text-white text-sm' onBlur={() => setSureToDelete(false)}>
                                Sure?
                            </button>
                        ) : (
                            <button onClick={() => setSureToDelete(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        )
                    }
                    
                </span>
            </div>
            <div className='flex justify-between'>
                <p className='p-1 m-2 text-sm font-bold text-gray-600'>Duration: {activity.duration}</p>
                <p className='p-1 m-2 text-sm font-bold text-gray-600' >Price: {activity.price} euros</p>
            </div>
        </div>
    )
}

export default SingleActivity