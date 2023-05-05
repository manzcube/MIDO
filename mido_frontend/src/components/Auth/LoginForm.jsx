import React from 'react'
import { Link } from "react-router-dom"
import Input from '../Root/Input'

const LoginForm = ({ onChange, onSubmit, inputProps }) => {
  return (
    <form onSubmit={onSubmit} className='flex flex-col p-5 rounded border'>
      <Input
        placeholder='Your email'
        type="email" 
        name='email' 
        value={inputProps.email} 
        onChange={onChange} 
      />
      <Input
        placeholder='Your password'
        type="password" 
        name='password' 
        value={inputProps.password} 
        onChange={onChange}  
      />
      <Link to="/register" className='text-xs text-sky-300 underline my-2'>Don't have an account?</Link>
      <button className='p-2 bg-blue-500 text-white shadow-md rounded-md mt-3 hover:shadow-xl'>Log In</button>
    </form>
  )
}

export default LoginForm