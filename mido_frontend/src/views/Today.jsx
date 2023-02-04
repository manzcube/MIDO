import React, { useState } from 'react'
import Roles from '../components/Role/Roles'
import TodaysWorkersList from '../components/Worker/TodaysWorkersList'
import TodaysActivitiesList from '../components/Activity/TodaysActivitiesList'
import { useCreateDayMutation, useGetTodayQuery, useUpdateDayMutation } from '../features//today/todaySlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import SignInBadge from '../components/Root/SignInBadge'

export const SmallWorker = ({ worker }) => {
  const default_pic = "https://imgs.search.brave.com/UOHewl77s_cOrxcg1FpDaocIjjuonwgezaN4DtbAPp4/rs:fit:800:800:1/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9zZWFo/b3JzZS1pY29uLXNl/YWhvcnNlLW9jZWFu/LWFuaW1hbC1vdXRs/aW5lLWljb24tbG9n/by12ZWN0b3ItaWxs/dXN0cmF0aW9uLTE4/MTQ4Mjg2OS5qcGc"

  return (
      <div className="border p-3 rounded-xl m-4 w-42 h-50 shadow-md bg-slate-700 cursor-grab">
          <div className='w-full flex justify-center mb-2'>
              <img src={worker.picture ? worker.picture : default_pic}
                  alt="" 
                  className='flex rounded-full w-20 h-20' 
              />
          </div>
          <div className='flex flex-col items-start overflow-clip'>
              <p className='uppercase text-xs text-white'>{worker.name}</p>
              <p className='text-xs text-gray-300'>{worker.title}</p>
          </div>                
      </div>
  )
}

const Entry = ({activity, dayId}) => {
  const [updateDay, {isLoading: isUpdateLoading }] = useUpdateDayMutation()
  let content;
  console.log(activity._id, dayId)
  async function drop(e) {
    e.preventDefault()
    let data = e.dataTransfer.getData("text") 
    const parsedData = JSON.parse(data)
    if (parsedData.type === "worker") {
      const { name, title, picture } = parsedData
      if (!isUpdateLoading) {
        const updatedDayResponse = await updateDay({ id: dayId, body: { type: "worker", activityId: activity._id, newEntry: { title, name, picture, roles:[] }}})
        console.log("UPDATED ACTIVITY", updatedDayResponse)
      }
    }
  }
  return (
      <div className={`${activity.color} flex justify-between p-3 rounded-md my-4 w-full shadow-md`}>
        <div className='w-1/5'>
          <p className='p-1 uppercase font-bold text-gray-800'>{activity.title}</p>
          <p className='p-1 m-2 text-sm text-gray-600'>Duration: {activity.duration}</p>
        </div>
        <div 
          onDrop={e => drop(e)} 
          onDragOver={e => e.preventDefault()}  
          className='w-4/5 ml-5 border flex flex-wrap border-white rounded-md focus:border-gray-800'>
            {activity.workers?.map(worker => (
              
          <SmallWorker key={activity.workers.indexOf(worker)} worker={worker} />
        ))}
        </div>
        
      </div>
  )
}

const Today = () => {
  console.log("TODAY COMPONENT RENDERING")
  const date = new Date().toISOString().split("T")[0]
  const [chooseDate, setChooseDate] = useState(date)
  const { data: oneDay, isLoading: isOneDayLoading, isSuccess, isError, error } = useGetTodayQuery(chooseDate)
  const [updateDay, {isLoading: isUpdateLoading }] = useUpdateDayMutation()

  if (isError) {
    toast.error(error.data)
  } 

  async function drop(e) {
    e.preventDefault()
    let data = e.dataTransfer.getData("text") 
    const parsedData = JSON.parse(data)
    if (parsedData.type === "activity") {
      const { title, duration, color } = parsedData
      if (!isUpdateLoading && !isOneDayLoading) {
        const updatedDayResponse = await updateDay({ id: oneDay._id, body: { type: "activity", newEntry: { title, color, duration, workers: [] }}})
        console.log("UPDATED ONE", updatedDayResponse)
      }
    }     
  }

  return (
    <div className="flex">
      <div className='p-10 flex flex-col w-4/6'>
        <input 
          className='bg-gray-200 p-2 w-40 rounded focus:outline-none'
          type="date" 
          value={chooseDate} 
          onChange={e => setChooseDate(e.target.value)} 
          />
        <div 
          id='dropDiv' 
          onDrop={e => drop(e)} 
          onDragOver={e => e.preventDefault()} 
          className='w-4/6 rounded-md border mt-5 flex flex-col items-center p-5 overflow-y-scroll'
        >
          <span>{oneDay?.date}</span> 
          {oneDay?.activities.map(act => (
            <Entry key={act._id} activity={act} dayId={oneDay.id} />
          ))}
        </div>
      </div>


      {/* Grabbing stuff */}
      <div className='flex flex-col items-center absolute right-96'>
        <span className='my-4 font-bold'>Activities</span>
        <div className='overflow-y-scroll grabbingColumns'>
          <TodaysActivitiesList />
        </div>       
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black mt-3 animate-bounce">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
        </svg>
      </div>
      <div className='flex flex-col items-center absolute right-56'>
        <span className='my-4 font-bold'>Workers</span>
        <div className='overflow-y-scroll grabbingColumns'>
          <TodaysWorkersList />
        </div>       
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black mt-3 animate-bounce">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
        </svg>
      </div>
      <div className='flex flex-col items-center absolute right-10'>
      <span className='my-4 font-bold'>Roles</span>
        <div className='overflow-y-scroll grabbingColumns'>
          <Roles />
        </div>       
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black mt-3 animate-bounce">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
        </svg>
      </div>
    </div>
  )
}

export default Today