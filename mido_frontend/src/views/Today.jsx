// Lib
import React, { useState, memo } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

// Endpoint
import { useGetTodayQuery, useUpdateDayMutation } from '../features//today/todaySlice'

// Toast
import { toast } from 'react-toastify'

// Components
import DroppingSections from "../components/Today/DroppingSections"
import Roles from '../components/Role/Roles'
import TodaysWorkersList from '../components/Worker/TodaysWorkersList'
import TodaysActivitiesList from '../components/Activity/TodaysActivitiesList'
import TodaySelector from '../components/Today/TodaySelector'



const MemoizedDayActivitiesList = memo(TodaysActivitiesList)
const MemoizedDayWorkersList = memo(TodaysWorkersList)

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
  async function drop(e, sec) {
    e.preventDefault()
    let data = e.dataTransfer.getData("text") 
    const parsedData = JSON.parse(data)
    if (parsedData.type === "activity") {
      const { title, color } = parsedData
      if (!isUpdateLoading && !isOneDayLoading) {
        try {
          await updateDay({ 
            id: oneDay._id, 
            body: { 
              type: "activity", 
              newEntry: { 
                activityTitle: title, 
                schedule: sec,
                color
              }
            }
          }).then((response) => toast.success(response))
          .catch((err) => {
            throw new Error(err.data)
          })
        } catch (err) {
          toast.error(err)
        }
      }
    }   
  }

 
  return user ? (
    <div className=''>
      <TodaySelector oneDay={oneDay} chooseDate={chooseDate} setChooseDate={setChooseDate} />
      <MemoizedDayWorkersList />
      <MemoizedDayActivitiesList />
      <div className='p-10 mt-56 bg-gray-100 flex flex-col w-full'>
        <DroppingSections oneDay={oneDay} drop={drop} />         
      </div>
    </div>
  ) : <Navigate to="/" />
}

export default Today