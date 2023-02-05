import React from 'react'

const Column = ({ children, rightMargin, title }) => {
  return (
    <div className={`flex flex-col items-center absolute ${rightMargin}`}>
        <span className='my-4 font-bold'>{title}</span>
        <div className='overflow-y-scroll grabbingColumns'>
          {children}
        </div>       
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black mt-3 animate-bounce">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
        </svg>
    </div>
  )
}

export default Column