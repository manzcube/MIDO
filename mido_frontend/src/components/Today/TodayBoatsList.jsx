// Lib
import React from 'react';
import SmallBoat from './SmallBoat';


const TodayBoatsList = () => {

  return (
    <div className='flex flex-col fixed -right-1 z-20 bottom-0 border w-40 p-3 border-l overflow-y-scroll border-b-2 bg-white grabbable rightColumn'>
      <h1 className='text-center text-gray-800 font-bold text-sm underline'>Boats</h1>
      <SmallBoat name="Buzios" color="bg-red-200" id="1" />
      <SmallBoat name="Tortugueta" color="bg-yellow-200" id="2" />
    </div>
  )
}

export default TodayBoatsList