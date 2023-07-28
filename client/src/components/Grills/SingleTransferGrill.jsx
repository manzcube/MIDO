import React from 'react'

// Components 
import DroppedDriver from '../Transfers/DroppedDriver'

const SingleTransferGrill = ({ transfers, schedule, drop }) => {
  const sch = schedule.split("-")[0]
  
  const filteredDrivers = transfers.drivers.filter(driver => driver.schedule === sch)

  return (
    <div className='mt-10 w-72'>
      <p className='text-md font-bold m-2 text-gray-700'>{schedule}</p>
      <div 
        id='dropDiv' 
        onDrop={e => drop(e, sch)} 
        onDragOver={e => e.preventDefault()} 
        className={`flex flex-wrap ${filteredDrivers.length ? "p-3":"py-9"} m-5 border border-gray-200 rounded-lg bg-white`}
      >
        {filteredDrivers.map(driver => <DroppedDriver transfers={transfers} key={driver._id} worker={driver} /> )}
      </div>
    </div>
    )
}

export default SingleTransferGrill