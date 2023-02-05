import React from 'react'

// Components
import Input from '../Root/Input'
import Button from '../Root/Button'

const ActivityForm = ({ onChange, onSubmit, inputProps }) => {
  console.log('activity form')
  return (
    <form className="flex flex-col border rounded py-5 px-8 max-w-lg" >
        <Input
          type="text"
          value={inputProps.title}
          onChange={onChange}
          placeholder="Title"
          name="title"
        />
        <Input
          value={inputProps.price}
          onChange={onChange}
          placeholder='Price'
          type="number" 
          name="price"
        />
        <Input
          value={inputProps.schedule1}
          onChange={onChange}
          type="time" 
          name="schedule1"
        />
        <Input
          value={inputProps.schedule2}
          onChange={onChange}
          type="time" 
          name="schedule2"
        />
        <select 
            className='py-2 px-3 my-3 bg-gray-50 text-sm text-gray-700 border border-gray-300 rounded-md leading-tight focus:bg-gray-100 focus:outline-none'
            placeholder='Color' 
            name="color" 
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