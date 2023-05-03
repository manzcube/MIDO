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
    <div className='w-full p-10 flex flex-col md:flex-row mt-28'>
      <div className="lg:w-1/5 w-full mb-10">
        <MemoizedWorkerForm 
          onChange={handleChange} 
          onSubmit={onSubmit} 
          inputProps={{ title, name }} 
        />
      </div>
      <div className='lg:w-4/5 p-20 w-full'>
        <h4 className='text-xl font-bold text-gray-700'>Workers</h4>
        <MemoizedWorkersList />
      </div>    
    </div>
  ) : <Navigate to="/" />
}

export default Workers