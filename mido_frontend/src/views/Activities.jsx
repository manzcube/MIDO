import React, { useState } from 'react'
import ActivityForm from '../components/ActivityForm'
import {useCreateActivityMutation} from "../features/activities/activitySlice.js"
import { toast } from 'react-toastify'

const Activities = () => {
  const token = localStorage.getItem("token")
  const [dropForm, setDropForm] = useState(false)
  const [createActivity, { isLoading }] = useCreateActivityMutation()
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    price: ''
  })
  const { title, duration, price } = formData
  const canSubmit = [title, duration, price].every(Boolean) && !isLoading;

  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    })
  )}

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!token) {
      toast.error("You're not authorized!")
      return;
    }
    if (canSubmit) {
      try {
        await createActivity({ title, duration, price}).unwrap()
        setFormData({ 
          title: '',
          duration: '',
          price: '' 
        })
        toast.success(`Activity  created`)        
      } catch (err) {
        toast.error(err.message)
      }
        
    }    
  }

  

  return (
    <div className='w-full p-20 grid grid-cols-2'>
      <div className="pr-20">
        <button className="flex items-center justify-between bg-gray-800 text-white text-sm rounded-lg p-2 my-6 w-40 hover:scale-105 active:scale-95" onClick={() => setDropForm(!dropForm)}>
          <span>Create Activity</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </button>
        <ActivityForm onChange={onChange} onSubmit={onSubmit} inputProps={{ title, duration, price, dropForm }} />
      </div>
      <div>
        <h4 className='text-xl font-bold text-gray-700'>Activities</h4>
        <div className='w-full flex flex-wrap'>
          {/* {renderedActivities} */}
        </div>
      </div>    
    </div>
  )
}

export default Activities