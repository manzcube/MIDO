import React from 'react'
import Input from '../Root/Input'

const RegisterForm = ({ onChange, onSubmit, inputProps }) => {
  return (
    <form onSubmit={onSubmit} className='flex flex-col p-5 rounded border'>
        <Input
            placeholder='Your name'
            type="text" 
            name='name' 
            value={inputProps.name} 
            onChange={onChange} 
        />
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
        <Input
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