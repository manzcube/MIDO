import React, { useState } from 'react'
import WorkerForm from '../components/WorkerForm'
import {useCreateWorkerMutation} from '../features/workers/workerSlice'
import { toast } from 'react-toastify'

const Workers = () => {
  const token = localStorage.getItem("token")
  const [dropForm, setDropForm] = useState(false)
  const [createWorker, { isLoading }] = useCreateWorkerMutation()
  const [formData, setFormData] = useState({
    title: '',
    name: ''
  })
  const { title, name } = formData
  const canSubmit = [title, name].every(Boolean) && !isLoading;

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
        await createWorker({ title, name}).unwrap()
        setFormData({ 
          title: '',
          name: '',
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
        <button className="flex items-center justify-between bg-gray-800 text-white text-sm rounded-lg p-2 my-6 w-32 hover:scale-105 active:scale-95" onClick={() => setDropForm(!dropForm)}>
          <span>Add Worker</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
          </svg>

        </button>
        <WorkerForm onChange={onChange} onSubmit={onSubmit} inputProps={{ title, name, dropForm }} />
      </div>
      <div>
        <h4 className='text-xl font-bold text-gray-700'>Workers</h4>
        <div className='w-full flex flex-wrap'>
          {/* {renderedActivities} */}
        </div>
      </div>    
    </div>
  )
}

export default Workers