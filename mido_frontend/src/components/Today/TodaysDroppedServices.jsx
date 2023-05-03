import React from 'react'
import Entry from './Entry'

const TodaysDroppedServices = ({ oneDay }) => {
  return oneDay?.activities.length ? (
    <>
      {/* Activities from 8 */}
      <div className='w-full'>
        <p className="my-4 text-xl">08:30-10:30</p>
        <div className='w-full p-10 border border-gray-500 my-10 rounded-md'>
          {oneDay?.activities.map(act => {
            return act.schedule.startsWith("08") ? 
              <Entry key={act._id} activity={act} dayId={oneDay.id} /> : ""
          })}
        </div>
      </div>
      {/* Activities from 11 */}
      <div className='w-full'>
        <p className="my-4 text-xl">11:00-13:00</p>
        <div className='w-full p-10 border border-gray-500 my-10 rounded-md'>
          {oneDay?.activities.map(act => {
            return act.schedule.startsWith("11") ? 
              <Entry key={act._id} activity={act} dayId={oneDay.id} /> : ""
          })}
        </div>
      </div>
      {/* Activities from 14 */}
      <div className='w-full'>
        <p className="my-4 text-xl">14:30-17:00</p>
        <div className='w-full p-10 border border-gray-500 my-10 rounded-md'>
          {oneDay?.activities.map(act => {
            return act.schedule.startsWith("14") ? 
              <Entry key={act._id} activity={act} dayId={oneDay.id} /> : ""
          })}
        </div>
      </div>
    </>
  ) : (
    <span className='mt-20 w-full text-gray-800 border border-dashed border-gray-700 rounded-md p-10 flex flex-col items-center'>
      Drop an Activity
    </span>
    )
}

export default TodaysDroppedServices