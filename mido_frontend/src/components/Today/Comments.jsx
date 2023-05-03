import React from 'react'

const Comments = ({ value, onChange, changing, onSave }) => {
  return (
    <>
        <textarea name="comments" placeholder='Comments' value={value} id='comments' cols="22" rows="5" onChange={onChange} className='bg-gray-50 p-2 rounded-md focus:outline-none text-gray-800 text-sm' />
        <span className='flex items-center space-x-2'>
            <button className='bg-sky-600 rounded-md text-white p-1 text-sm' onClick={onSave}>save</button>
            {changing ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            )}
        </span>
    </>
  )
}

export default Comments