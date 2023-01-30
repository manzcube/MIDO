import React from 'react'

const ActivityForm = ({ onChange, onSubmit, inputProps }) => {
  console.log('activity form')
  return (
    <form className={`${inputProps.dropForm ? 'flex flex-col' : "hidden"} border rounded py-5 px-8`}>
        <input 
            className='py-2 px-4 my-3 bg-gray-50 text-sm text-gray-700 border border-gray-300 rounded-md leading-tight focus:bg-white focus:outline-none'
            placeholder='Title'
            type="text" 
            name='title' 
            value={inputProps.title} 
            onChange={onChange} 
        />
        <input 
            className='py-2 px-4 my-3 bg-gray-50 text-sm text-gray-700 border border-gray-300 rounded-md leading-tight focus:bg-white focus:outline-none'
            placeholder='Duration'
            type="text" 
            name='duration' 
            value={inputProps.duration} 
            onChange={onChange} 
        />
        <input 
            className='py-2 px-4 my-3 bg-gray-50 text-sm text-gray-700 border border-gray-300 rounded-md leading-tight focus:bg-white focus:outline-none'
            placeholder='Price'
            type="number" 
            name='price' 
            value={inputProps.price} 
            onChange={onChange} 
        />
        <button onClick={onSubmit} className='p-2 bg-gray-800 text-white rounded-md mt-3'>Save</button>
      </form>
  )
}

export default ActivityForm