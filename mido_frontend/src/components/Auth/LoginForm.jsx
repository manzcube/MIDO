import React from 'react'
import { Link } from "react-router-dom"
import Input from '../Root/Input'

const LoginForm = ({ onChange, onSubmit, inputProps }) => {
  return (
    <form onSubmit={onSubmit} className='flex flex-col p-20 gap-4 rounded-lg border shadow-xl'>
      <h1 className='text-center text-gray-700 font-bold'>Log In</h1>
      <Input
        placeholder='Your email'
        type="email" 
        label="Email"
        name='email' 
        value={inputProps.email} 
        onChange={onChange} 
      />
      <Input
      label="Password"
        placeholder='Your password'
        type="password" 
        name='password' 
        value={inputProps.password} 
        onChange={onChange}  
      />
      <button className='p-2 bg-blue-500 text-white shadow-md rounded-md mt-3 hover:shadow-xl'>Log In</button>
    </form>
  )
}

export default LoginForm