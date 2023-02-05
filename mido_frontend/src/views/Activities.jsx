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
import {useCreateActivityMutation } from "../features/activities/activitySlice.js"

// Memo
const MemoizedActivitiesList = memo(ActivitiesList)
const MemoizedActivityForm = memo(ActivityForm)

const Activities = () => {
  // State
  const user = localStorage.getItem("user")
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    color: "bg-sky-200",
    schedule1: "08:00",
    schedule2: "17:00",
  })
  const { title, price, color, schedule1, schedule2 } = formData
  // Utils
  const handleChange = onChange(setFormData)
  // Mutation
  const [createActivity, { isLoading }] = useCreateActivityMutation()
  const canSubmit = [title, color, schedule1, schedule2].every(Boolean) && !isLoading;
  // Handle worker creation
  const onSubmit = async (e) => {
    e.preventDefault()
    if (canSubmit) {
      try {
        await createActivity({ title, price, color, schedule: schedule1.concat("-", schedule2) }).unwrap()
        setFormData({ 
          title: '',
          price: 0,
          color: "bg-sky-200",
          schedule1: "08:00",
          schedule2: "17:00",
        
        })
        toast.success(`Activity  created`)        
      } catch (err) {
        toast.error(err.message)
      }
    }  else {
      toast.error("Check inputs")
    }  
  }


  return user ? (
    <div className='w-full p-20 grid grid-cols-2'>
      <div className="pr-20">
        <div className="flex items-center justify-between bg-gray-800 text-white text-sm rounded-lg p-2 my-6 w-40">
          <span>Create Activity</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
        <MemoizedActivityForm onChange={handleChange} onSubmit={onSubmit} inputProps={{ title, price, color, schedule1, schedule2 }} />
      </div>
      <div>
        <h4 className='text-xl font-bold mb-3 text-gray-700'>Activities</h4>
        <MemoizedActivitiesList />
      </div>    
    </div>
  ) : <Navigate to="/" />
}

export default Activities