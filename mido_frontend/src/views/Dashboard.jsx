import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  let token = localStorage.getItem("token")
  return (
    <div className='m-10 flex flex-col justify-start lg:px-52'>
      <h1 className='text-4xl text-blue-500 mb-8 font-bold md:text-5xl lg:text-7xl md:mt-60'>MIDO</h1>
      <p className='text-md text-slate-400 lg:text-lg'>A platform to lineup the workflow of your business.</p>
      <p className='text-md text-slate-400 lg:text-lg'>Coordinate and organize your services and your team's approach to the best solution.</p>
      <div className="flex">
        <Link to={`/${token ? "today" : "login"}`} className='flex items-center bg-blue-500 text-white text-sm rounded-lg p-2 my-6 hover:shadow-xl transition-all duration-300'>
          Get Started
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 ml-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
          </svg>
        </Link>
      </div>
    </div>  
  )
}

export default Dashboard