import React from 'react'

import Entry from "./Entry"

const DroppingSections = ({ drop, oneDay }) => {
  return (
    <>
        <div className='mt-10 firstDropSection'>
            <p className='text-lg font-bold m-2 text-gray-700'>08:30-10:30</p>
            <div 
              id='dropDiv' 
              onDrop={e => drop(e, "08:30")} 
              onDragOver={e => e.preventDefault()} 
              className='flex flex-col items-center py-20 px-5 mx-20 border border-gray-200 rounded bg-white'
            >
              {oneDay?.activities.map(act => {
                return act.schedule.startsWith("08") ? 
                  <Entry key={act._id} activity={act} dayId={oneDay.id} /> : ""
              })}
            </div>
        </div>

        <div className='mt-10 secondDropSection'>
            <p className='text-lg font-bold m-2 text-gray-700'>11:00-13:00</p>
            <div 
              id='dropDiv' 
              onDrop={e => drop(e, "11:00")} 
              onDragOver={e => e.preventDefault()} 
              className='flex flex-col items-center py-20 px-5 mx-20 border border-gray-200 rounded bg-white'
            >
              {oneDay?.activities.map(act => {
                return act.schedule.startsWith("11") ? 
                  <Entry key={act._id} activity={act} dayId={oneDay.id} /> : ""
              })}
            </div>
        </div>

        <div className='mt-10 thirdDropSection'>
            <p className='text-lg font-bold m-2 text-gray-700'>14:30-17:00</p>
            <div 
              id='dropDiv' 
              onDrop={e => drop(e, "14:30")} 
              onDragOver={e => e.preventDefault()} 
              className='flex flex-col items-center py-20 px-5 mx-20 border border-gray-200 rounded bg-white'
            >
              {oneDay?.activities.map(act => {
                return act.schedule.startsWith("14") ? 
                  <Entry key={act._id} activity={act} dayId={oneDay.id} /> : ""
              })}
            </div>
        </div> 
    </>
  )
}

export default DroppingSections