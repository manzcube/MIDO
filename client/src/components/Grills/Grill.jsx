import React from 'react'

// Components 
import Entry from './Entry'

const Grill = ({ bookings, oneDay, schedule, drop, group }) => {
  const sch = schedule.split("-")[0]
  const filteredBookings = bookings?.bookings_list.filter(book => book.values[6] === sch)
  const filteredActitvites = oneDay.activities.filter(act => act.schedule === sch)

  return (
    <div className='mt-10'>
      <p className='text-md font-bold m-2 text-gray-700'>{schedule}
      {group ? (
        <span className={`${group === "A" ? "text-blue-400":"text-red-400"} flex gap-2`}>Group {group}</span>
      ):""}
      </p>
      <div 
        id='dropDiv' 
        onDrop={e => drop(e, sch)} 
        onDragOver={e => e.preventDefault()} 
        className='flex flex-col items-center p-3 m-5 border border-gray-200 rounded-lg bg-white'
      >
        {filteredActitvites.map(act => <Entry bookings={filteredBookings} key={act._id} activity={act} dayId={oneDay.id} /> )}
      </div>
    </div>
    )
}

export default Grill