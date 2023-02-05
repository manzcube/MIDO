import React from 'react'

// Components 
import Button from "../Root/Button";
import Input from '../Root/Input';

const WorkerForm = ({ onChange, onSubmit, inputProps }) => {
  return (
    <form className="flex flex-col border rounded py-5 px-8 max-w-sm" >
        <Input
          type="text"
          value={inputProps.name}
          onChange={onChange}
          placeholder="Name*"
          name="name"
        />
        <Input
          type="text"
          value={inputProps.title}
          onChange={onChange}
          placeholder="Title*"
          name="title"
        />
        <input 
            className='py-2 px-4 my-3 bg-gray-50 text-sm text-gray-700 border border-gray-300 rounded-md leading-tight focus:bg-white focus:outline-none'
            placeholder='Picture url'
            type="text" 
            name='picture' 
            value={inputProps.picture} 
            onChange={onChange} 
        />
        <Button onSubmit={onSubmit}>Save Worker</Button>
      </form>
  )
}

export default WorkerForm