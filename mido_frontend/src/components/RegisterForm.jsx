import React from 'react'
import { Link } from "react-router-dom"

const RegisterForm = ({ onChange, onSubmit, inputProps }) => {
    console.log('regisetr form')
  return (
    <form onSubmit={onSubmit} className='flex flex-col p-5 rounded border'>
        <input 
            className='py-2 px-4 my-3 bg-gray-50 text-sm text-gray-700 border border-gray-300 rounded-md leading-tight focus:bg-white focus:outline-none'
            placeholder='Your name'
            type="text" 
            name='name' 
            value={inputProps.name} 
            onChange={onChange} 
        />
        <input 
            className='py-2 px-4 my-3 bg-gray-50 text-sm text-gray-700 border border-gray-300 rounded-md leading-tight focus:bg-white focus:outline-none'
            placeholder='Your email'
            type="email" 
            name='email' 
            value={inputProps.email} 
            onChange={onChange} 
        />
        <input 
            className='py-2 px-4 my-3 bg-gray-50 text-sm text-gray-700 border border-gray-300 rounded-md leading-tight focus:bg-white focus:outline-none'
            placeholder='Your password'
            type="password" 
            name='password' 
            value={inputProps.password} 
            onChange={onChange} 
        />
        <input 
            className='py-2 px-4 my-3 bg-gray-50 text-sm text-gray-700 border border-gray-300 rounded-md leading-tight focus:bg-white focus:outline-none'
            placeholder='Confirm password'
            type="password" 
            name='confirm_password' 
            value={inputProps.confirm_password} 
            onChange={onChange} 
        />
        <button className='p-2 bg-gray-800 text-white rounded-md mt-3'>Register</button>
      </form>
  )
}

export default RegisterForm