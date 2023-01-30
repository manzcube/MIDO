import React from 'react'

const WorkerForm = ({ onChange, onSubmit, inputProps }) => {
  console.log('worker form')
  return (
    <form className={`${inputProps.dropForm ? 'flex flex-col' : "hidden"} border rounded py-5 px-8`}>
        <input 
            className='py-2 px-4 my-3 bg-gray-50 text-sm text-gray-700 border border-gray-300 rounded-md leading-tight focus:bg-white focus:outline-none'
            placeholder='Name'
            type="text" 
            name='name' 
            value={inputProps.name} 
            onChange={onChange} 
        />
        <input 
            className='py-2 px-4 my-3 bg-gray-50 text-sm text-gray-700 border border-gray-300 rounded-md leading-tight focus:bg-white focus:outline-none'
            placeholder='Title'
            type="text" 
            name='title' 
            value={inputProps.title} 
            onChange={onChange} 
        />
        <button onClick={onSubmit} className='p-2 bg-gray-800 text-white rounded-md mt-3'>Save</button>
      </form>
  )
}

export default WorkerForm