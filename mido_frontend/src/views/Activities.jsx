// Lib
import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

// Toast
import { toast } from 'react-toastify'

// Utils
import { onChange } from '../utils/utilities'

// Compoennt
import ActivityForm from '../components/Activity/ActivityForm'
import ActivitiesList from '../components/Activity/ActivitiesList'

// Endpoint
import {useCreateActivityMutation, useGetActivitiesQuery } from "../features/activities/activitySlice.js"
import SignInBadge from '../components/Root/SignInBadge'

// Memo
const MemoizedActivitiesList = memo(ActivitiesList)
const MemoizedActivityForm = memo(ActivityForm)

const Activities = () => {
  console.log("RUNNING ACTIVITIES")
  // State
  const user = localStorage.getItem("user")
  const [formData, setFormData] = useState({
    title: '',
    color: "bg-sky-200",
  })
  const { title, color } = formData
  // Utils
  const handleChange = onChange(setFormData)
  // Mutation
  const [createActivity, { isLoading }] = useCreateActivityMutation()
  const { data: activities, isQueryLoading, isSuccess, isError, error } = useGetActivitiesQuery()
  let content;
  const canSubmit = [title, color  ].every(Boolean) && !isLoading;
  // Handle worker creation
  const onSubmit = async (e) => {
    e.preventDefault()
    if (canSubmit) {
      try {
        await createActivity({ title, color }).unwrap()
        setFormData({ 
          title: '',
          color: "bg-sky-200",
        })
        toast.success(`Activity  created`)        
      } catch (err) {
        toast.error(err.message)
      }
    }  else {
      toast.error("Check inputs")
    }  
  }

  if (isSuccess) {
    content = <div className='w-full p-20 grid grid-cols-2 mt-28'>
                <div className="pr-20">
                  <MemoizedActivityForm onChange={handleChange} onSubmit={onSubmit} inputProps={{ title, color }} />
                </div>
                <div>
                  <h4 className='text-xl font-bold mb-3 text-gray-700'>Activities</h4>
                  <div className='flex flex-wrap gap-8'>
                    <MemoizedActivitiesList activities={activities} />
                  </div>
                </div>    
              </div>
  } else if (isQueryLoading) {
    content = <SignInBadge />
  } else if (isError) {
    console.log(error)
    content = <p className='mt-96 w-full text-gray-700 z-20 absolute text-center'>{error.data}</p>
  }


  return user ? content : <Navigate to="/" />
}

export default Activities