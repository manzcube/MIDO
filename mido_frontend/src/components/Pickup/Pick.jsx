import React from 'react'

const Pick = ({ content }) => {
  return (
    <div className='w-full flex gap-20 p-16'>
      <div className='w-3/5'>
        <div className='DRIVERS'>
          <p className='mt-10 font-bold'>Drivers</p>
          <div className='flex gap-5'>
            {content}
          </div>
        </div>
        <div className='TIMEFRAMES'>
          <p className='mt-10 font-bold'>Timeframes</p>
          <div className='flex flex-col gap-5'>
            <div>
              <p>Pick up 8:30</p>
              <div className='w-full border border-black rounded h-20'></div>
            </div>
            <div>
              <p>Pick up 11:30</p>
              <div className='w-full border border-black rounded h-20'></div>
            </div>
            <div>
              <p>Drop off 12:00</p>
              <div className='w-full border border-black rounded h-20'></div>
            </div>
            <div>
              <p>Drop off 14:00</p>
              <div className='w-full border border-black rounded h-20'></div>
            </div>
            <div>
              <p>Pick up 15:30</p>
              <div className='w-full border border-black rounded h-20'></div>
            </div>
            <div>
              <p>Drop off 17:30</p>
              <div className='w-full border border-black rounded h-20'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-2/5'>
        <p className='mt-10 font-bold'>Bookings</p>
        <div className='Booking my-10'>
          <p>8:30</p>
          <div className='w-full bg-stone-100 shadow-xl p-10 border flex flex-wrap gap-10 rounded'>
            <div>
              <p className='underline'>Hotel Sumba</p>
              <p className='flex flex-col text-sm'>
                <span>- 2 ENG DSD</span>
                <span>- 3 FRE CAVE</span>
                <span>- 5 FRE CAVE</span>
              </p>
            </div>
            <div>
              <p className='underline'>Hotel Mariant</p>
              <p className='flex flex-col text-sm'>
                <span>- 2 ENG DSD</span>
                <span>- 3 FRE CAVE</span>
                <span>- 5 FRE CAVE</span>
              </p>
            </div>
            <div>
              <p className='underline'>Hotel Mariant Park</p>
              <p className='flex flex-col text-sm'>
                <span>- 2 ENG DSD</span>
                <span>- 3 FRE CAVE</span>
                <span>- 5 FRE CAVE</span>
              </p>
            </div>
            
          </div>
        </div>

        <div className='Booking my-10'>
          <p>11:30</p>
          <div className='w-full bg-stone-100 shadow-xl p-10 border flex flex-wrap gap-10 rounded'>
            <div>
              <p className='underline'>Hotel Sumba</p>
              <p className='flex flex-col text-sm'>
                <span>- 2 ENG DSD</span>
                <span>- 3 FRE CAVE</span>
                <span>- 5 FRE CAVE</span>
              </p>
            </div>
            <div>
              <p className='underline'>Hotel Mariant</p>
              <p className='flex flex-col text-sm'>
                <span>- 2 ENG DSD</span>
                <span>- 3 FRE CAVE</span>
                <span>- 5 FRE DSD</span>
                <span>- 5 FRE CAVE</span>
                <span>- 5 FRE CAVE</span>
              </p>
            </div>
            <div>
              <p className='underline'>Hotel Mariant Park</p>
              <p className='flex flex-col text-sm'>
                <span>- 2 ENG DSD</span>
              </p>
            </div>
            <div>
              <p className='underline'>Hotel Punta Reina</p>
              <p className='flex flex-col text-sm'>
                <span>- 2 ENG DSD</span>
                <span>- 5 FRE CAVE</span>
              </p>
            </div>
            <div>
              <p className='underline'>Hotel Americas</p>
              <p className='flex flex-col text-sm'>
                <span>- 2 ENG DSD</span>
              </p>
            </div>
            
          </div>
        </div>

        <div className='Booking my-10'>
          <p>15:30</p>
          <div className='w-full bg-stone-100 shadow-xl p-10 border flex flex-wrap gap-10 rounded'>
            <div>
              <p className='underline'>Hotel Sumba</p>
              <p className='flex flex-col text-sm'>
                <span>- 2 ENG DSD</span>
                <span>- 3 FRE CAVE</span>
                <span>- 5 FRE CAVE</span>
              </p>
            </div>
            <div>
              <p className='underline'>Hotel Mariant</p>
              <p className='flex flex-col text-sm'>
                <span>- 2 ENG DSD</span>
                <span>- 3 FRE CAVE</span>
                <span>- 5 FRE CAVE</span>
              </p>
            </div>
            <div>
              <p className='underline'>Hotel Mariant Park</p>
              <p className='flex flex-col text-sm'>
                <span>- 2 ENG DSD</span>
                <span>- 3 FRE CAVE</span>
                <span>- 5 FRE CAVE</span>
              </p>
            </div>
            <div>
              <p className='underline'>Hotel Punta Reina</p>
              <p className='flex flex-col text-sm'>
                <span>- 2 ENG DSD</span>
                <span>- 3 FRE CAVE</span>
                <span>- 5 FRE CAVE</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pick