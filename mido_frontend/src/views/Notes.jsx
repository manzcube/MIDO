import React, { useState } from 'react'
import { Navigate } from "react-router-dom"
import Note from '../components/Notes/Note'
import { useCreateNoteMutation, useGetNotesQuery } from '../features/Notes/noteSlice'
import SignInBadge from "../components/Root/SignInBadge";
import Input from "../components/Root/Input"
import "../index.css"

const Notes = () => {
  const user = localStorage.getItem("user")
  const token = localStorage.getItem("token")
  const [note, setNote] = useState("")
  const [ createNote, { isLoading: isCreateNoteLoading }] = useCreateNoteMutation()
  const { data: notes, isLoading, isSuccess, isError, error } = useGetNotesQuery()
  let content;
  console.log("THIS IS THE RRIRR", error)
  const submitNote = async (e) => {
    e.preventDefault()
    try {
      if (!isCreateNoteLoading) {
        await createNote({ text: note, author: user })
        .then((response) => {
          console.log(response)
          setNote("")
        }).catch(err => {
          throw new Error(err.message)
        })
      }
    } catch (err) {
      console.log("THIS IS THE RRIRR", err)
    }
  } 

  if (isLoading) {
    content = <SignInBadge />
  } else if (isSuccess) {
    content = notes.map(note => (
      <Note key={note._id} note={note} />
    ))
  } else if (isError) {
    content = "Something is wrong"
  }
  return (user && token) ? (
    <div className='flex flex-col items-center'>
      <div className='border flex m-7 p-3 w-full'>
        <div className='w-1/2 notesCanvas'>
          {content}
        </div>
        <div className='w-1/2'>
          <textarea 
            className='border w-full bg-gray-50 rounded-md text-sm p-3 focus:outline-none' 
            type="text" 
            rows={31}
            value={note} 
            name="note" 
            onChange={e => setNote(e.target.value)} 
            placeholder="Write something" 
          />
          <button onClick={submitNote} className='py-1 px-2 bg-gray-800 rounded-md text-sm text-white'>create note</button>
        </div>       
      </div>
      {/* <div className='flex items-end space-x-3'>
        
      </div> */}
    </div>
  ) : <Navigate to="/" />
}

export default Notes