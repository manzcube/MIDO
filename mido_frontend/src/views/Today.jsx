// Lib
import React, { useState, memo } from 'react'
import { Navigate } from 'react-router-dom'

// Endpoint
import { useGetTodayQuery, useUpdateDayMutation } from '../features//today/todaySlice'

// Toast
import { toast } from 'react-toastify'

// Components
import DroppingSections from "../components/Today/DroppingSections"
import TodaysWorkersList from '../components/Today/TodaysWorkersList'
import TodaysActivitiesList from '../components/Today/TodaysActivitiesList'
import TodayBoatsList from '../components/Today/TodayBoatsList'
import BookingsList from '../components/Bookings/BookingsList'
import TodaySelector from '../components/Today/TodaySelector'
import SignInBadge from '../components/Root/SignInBadge'

const MemoizedDayActivitiesList = memo(TodaysActivitiesList)
const MemoizedDayBoatsList = memo(TodayBoatsList)
const MemoBookingsList = memo(BookingsList)
const MemoizedDayWorkersList = memo(TodaysWorkersList)

const Today = () => {
  const user = localStorage.getItem("user")
  const date = new Date().toISOString().split("T")[0]
  const [chooseDate, setChooseDate] = useState(date)
  const { data: oneDay, isLoading: isOneDayLoading, isSuccess, isError, error } = useGetTodayQuery(chooseDate)
  let content;
  const [updateDay, {isLoading: isUpdateLoading }] = useUpdateDayMutation()

  if (isSuccess) {
    content = <>
      <TodaySelector oneDay={oneDay} chooseDate={chooseDate} setChooseDate={setChooseDate} />
      <MemoizedDayWorkersList />
      <div className="w-full flex">
        <MemoBookingsList />
        <div className='p-8 pt-44 pl-64 pr-56 bg-gray-100 flex flex-col w-full'>
          <DroppingSections oneDay={oneDay} drop={drop} />         
        </div>
        <MemoizedDayActivitiesList />
        {/* <MemoizedDayBoatsList /> */}
      </div>
    </>    
  } else if (isOneDayLoading) {
    content = <SignInBadge />
  } else if (isError) {
    content = <p className='mt-96 w-full text-gray-700 z-20 absolute text-center'>{error.data}</p>
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
 
  return user ? content : <Navigate to="/" />
}

export default Today