// Lib
import React, { useState, memo } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

// Endpoint
import { useGetTodayQuery, useUpdateDayMutation } from '../features//today/todaySlice'

// Toast
import { toast } from 'react-toastify'

// Components
import Column from '../components/Today/Column'
import Input from '../components/Root/Input'
import Roles from '../components/Role/Roles'
import TodaysWorkersList from '../components/Worker/TodaysWorkersList'
import Entry from '../components/Today/Entry'
import TodaysActivitiesList from '../components/Activity/TodaysActivitiesList'



const MemoizedDayActivitiesList = memo(TodaysActivitiesList)
const MemoizedDayWorkersList = memo(TodaysWorkersList)
const MemoizedDayRolesList = memo(Roles)

const Today = () => {
  const user = localStorage.getItem("user")
  const date = new Date().toISOString().split("T")[0]
  const [chooseDate, setChooseDate] = useState(date)
  const { data: oneDay, isLoading: isOneDayLoading, isSuccess, isError, error } = useGetTodayQuery(chooseDate)
  const [updateDay, {isLoading: isUpdateLoading }] = useUpdateDayMutation()

  if (isError) {
    toast.error(error.data)
  } 

  // Handle update when dropping activity
  async function drop(e) {
    e.preventDefault()
    let data = e.dataTransfer.getData("text") 
    const parsedData = JSON.parse(data)
    if (parsedData.type === "activity") {
      const { title, duration, color, schedule } = parsedData
      if (!isUpdateLoading && !isOneDayLoading) {
        try {
          await updateDay({ 
            id: oneDay._id, 
            body: { 
              type: "activity", 
              newEntry: { 
                activityTitle: title, 
                color, 
                duration, 
                schedule, 
              }
            }
          })
          toast.success("Activity added")
        } catch (err) {
          toast.error(err.data)
        }
      }
    }   
  }

 
  return user ? (
    // Dropping Stuff
    <div className="flex">
      <div className='p-10 flex flex-col w-4/6'>
        <div className='flex items-center space-x-2'>
          <Input value={chooseDate} onChange={e => setChooseDate(e.target.value)} type="date" />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 animate-ping">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
          </svg>
        </div>
        <div 
          id='dropDiv' 
          onDrop={e => drop(e)} 
          onDragOver={e => e.preventDefault()} 
          className='w-50 rounded-lg border mt-5 flex flex-col items-center p-5 overflow-y-scroll bg-gray-50'
        >
          <span>{oneDay?.date}</span> 
          {oneDay?.activities.length ? (oneDay?.activities.map(act => (
            <Entry key={act._id} activity={act} dayId={oneDay.id} />
          ))) : (
          <span className='mt-20 text-gray-800 border border-dashed border-gray-700 rounded-md p-10 flex flex-col items-center'>
            Drop an Activity
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          )}
        </div>
      </div>


      {/* Grabbing stuff */}
      <Column title="Activities" >
        <MemoizedDayActivitiesList />
      </Column>
      <Column title="Workers" >
        <MemoizedDayWorkersList />
      </Column>
      <Column title="Roles" >
        <MemoizedDayRolesList />
      </Column>
    </div>
  ) : <Navigate to="/" />
}

export default Today