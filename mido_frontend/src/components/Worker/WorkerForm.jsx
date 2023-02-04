import React from 'react'

const WorkerForm = ({ onChange, onSubmit, inputProps }) => {
  return (
    <form className={`${inputProps.dropForm ? 'flex flex-col' : "hidden"} border rounded py-5 px-8 max-w-sm`}>
        <input 
            className='py-2 px-4 my-3 bg-gray-50 text-sm text-gray-700 border border-gray-300 rounded-md leading-tight focus:bg-white focus:outline-none'
            placeholder='Name'
            type="text" 
            required
            name='name' 
            value={inputProps.name} 
            onChange={onChange} 
        />
        <input 
            className='py-2 px-4 my-3 bg-gray-50 text-sm text-gray-700 border border-gray-300 rounded-md leading-tight focus:bg-white focus:outline-none'
            placeholder='Title'
            required
            type="text" 
            name='title' 
            value={inputProps.title} 
            onChange={onChange} 
        />
        <input 
            className='py-2 px-4 my-3 bg-gray-50 text-sm text-gray-700 border border-gray-300 rounded-md leading-tight focus:bg-white focus:outline-none'
            placeholder='Picture'
            type="text" 
            name='picture' 
            value={inputProps.picture} 
            onChange={onChange} 
        />
        <button onClick={onSubmit} className='p-2 bg-gray-800 text-white rounded-md mt-3'>Save Worker</button>
      </form>
  )
}

export default WorkerForm