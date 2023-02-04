import React from 'react'

const RoleForm = ({ onChange, onSubmit, inputProps }) => {
  return (
    <form className="flex flex-col border rounded-lg mb-4 px-3 pb-2 w-44">
        <input 
            className='py-1 px-2 my-2 bg-gray-50 h-7 text-xs text-gray-700 border border-gray-300 rounded-md leading-tight focus:bg-white focus:outline-none'
            placeholder='Name'
            type="text" 
            required
            name='name' 
            value={inputProps.name} 
            onChange={onChange} 
        />
        <input 
            className='py-1 px-2 my-2 bg-gray-50 h-7 text-xs text-gray-700 border border-gray-300 rounded-md leading-tight focus:bg-white focus:outline-none'
            placeholder='Language'
            required
            type="text" 
            name='language' 
            value={inputProps.language} 
            onChange={onChange} 
        />
        <button onClick={onSubmit} className='p-1 bg-gray-800 text-white rounded-md mt-1 text-xs'>Make Role</button>
      </form>
  )
}

export default RoleForm