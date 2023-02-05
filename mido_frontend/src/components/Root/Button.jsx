import React from 'react'

const Button = ({ onSubmit, children}) => {
  return (
    <button 
        onClick={onSubmit} 
        className='p-2 bg-gray-800 text-sm text-white rounded-md mt-3'>
        {children}
    </button>

  )
}

export default Button