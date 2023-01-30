import React from 'react'
import { useState } from 'react'

const Today = () => {
  const date = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  const [chooseDate, setChooseDate] = useState(date)
  

  return (
    <div className='p-20 flex flex-col'>
      <div className="w-full">
        <input 
        className='bg-gray-400'
        type="date" 
        value={chooseDate} 
        onChange={e => setChooseDate(e.target.value)} 
        />
      </div>
      <span className='my-5 text-xl'>Date {chooseDate}</span>

    </div>
  )
}

export default Today