import React from 'react'
import { Link } from "react-router-dom"

const LoginForm = ({ onChange, onSubmit, inputProps }) => {
  console.log('login form')
  return (
    <form onSubmit={onSubmit} className='flex flex-col p-5 rounded border'>
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
        <Link to="/register" className='text-xs text-sky-300 underline my-2'>Don't have an account?</Link>
        <button className='p-2 bg-gray-800 text-white rounded-md mt-3'>Log In</button>
      </form>
  )
}

export default LoginForm