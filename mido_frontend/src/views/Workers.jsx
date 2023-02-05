// Lib
import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

// Toast
import { toast } from 'react-toastify'

// Utils
import { onChange } from '../utils/utilities'

// Endpoint
import { useCreateWorkerMutation } from '../features/workers/workerSlice'

// Components
import WorkersList from '../components/Worker/WorkersList'
import WorkerForm from '../components/Worker/WorkerForm'

// Memo
const MemoizedWorkersList = memo(WorkersList)
const MemoizedWorkerForm = memo(WorkerForm)

const Workers = () => {
  // State
  const user = localStorage.getItem("user")
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    picture: '',
  })
  const { title, name, picture } = formData

  // Utils
  const handleChange = onChange(setFormData)

  // Mutation
  const [createWorker, { isLoading }] = useCreateWorkerMutation()
  const canSubmit = [title, name].every(Boolean) && !isLoading;

  // Handle worker creation
  const onSubmit = async (e) => {
    e.preventDefault()
    if (canSubmit) {
      try {
        await createWorker({ title, name, picture }).unwrap()
        setFormData({ 
          title: '',
          name: '',
          picture: '',
        })
        toast.success(`Worker created`)    
      } catch (err) {
        toast.error(err.data)
      }        
    } else {
      toast.error("Check inputs")
    }
  }

  return user ? (
    <div className='w-full p-10 flex flex-col md:flex-row'>
      <div className="lg:w-1/5 w-full mb-10">
        <div className="flex items-center justify-between bg-gray-800 text-white text-sm rounded-lg p-2 my-6 w-32 hover:scale-105 active:scale-95">
          <span>Add Worker</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
          </svg>
        </div>
        <MemoizedWorkerForm 
          onChange={handleChange} 
          onSubmit={onSubmit} 
          inputProps={{ title, name, picture }} 
        />
      </div>
      <div className='lg:w-4/5 w-full'>
        <h4 className='text-xl font-bold text-gray-700'>Workers</h4>
        <MemoizedWorkersList />
      </div>    
    </div>
  ) : <Navigate to="/" />
}

export default Workers