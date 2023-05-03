import React from 'react'

// Components
import Input from '../Root/Input'
import Button from '../Root/Button'

const ActivityForm = ({ onChange, onSubmit, inputProps }) => {
  return (
    <form className="flex flex-col border shadow-xl rounded py-5 px-8 max-w-lg" >
        <p className="flex items-center justify-center font-bold text-gray-800 text-sm">
          <span>Add Activity</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </p>
        <Input
          label="Title"
          type="text"
          value={inputProps.title}
          onChange={onChange}
          placeholder="Title"
          name="title"
        />
        <label htmlFor="color" className='text-sm text-gray-700'>Color</label>
        <select 
            className='py-2 px-3 my-3 bg-gray-50 text-sm text-gray-700 border border-gray-300 rounded-md leading-tight focus:bg-gray-100 focus:outline-none'
            placeholder='Color' 
            name="color" 
            id="color" 
            value={inputProps.color} 
            onChange={onChange} 
        >
          <option className='text-gray-800' value="bg-sky-200">blue</option>
          <option className='text-gray-800' value="bg-purple-200">purple</option>
          <option className='text-gray-800' value="bg-green-200">green</option>
          <option className='text-gray-800' value="bg-yellow-200">yellow</option>
          <option className='text-gray-800' value="bg-red-200">red</option>
          <option className='text-gray-800' value="bg-orange-200">orange</option>
        </select>
        <Button onSubmit={onSubmit}>Save Activity</Button>
      </form>
  )
}

export default ActivityForm