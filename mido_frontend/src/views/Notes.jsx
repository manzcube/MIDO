import React, { useState } from 'react'
import { Navigate } from "react-router-dom"
import "../index.css"


// Toast 
import { toast } from 'react-toastify'

 // Endpoint
import { useCreateNoteMutation, useGetNotesQuery } from '../features/Notes/noteSlice'

// Components
import Note from '../components/Notes/Note'
import SignInBadge from "../components/Root/SignInBadge";

const Notes = () => {
  const user = localStorage.getItem("user")
  const [note, setNote] = useState("")
  const [ createNote, { isLoading: isCreateNoteLoading }] = useCreateNoteMutation()
  const { data: notes, isLoading, isSuccess, isError, error } = useGetNotesQuery()
  let content;

  const submitNote = async (e) => {
    e.preventDefault()
    try {
      if (!isCreateNoteLoading) {
        await createNote({ text: note, author: user })
        .then(() => {
          setNote("")
        }).catch(err => {
          throw new Error("Note cannot be created")
        })
      }
    } catch (err) {
      toast.error(err.message)
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
  return user ? (
    <div className='flex flex-col items-center'>
      <div className='border flex m-7 p-3 w-full'>
        <div className='w-1/2 notesCanvas p-5'>
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
    </div>
  ) : <Navigate to="/" />
}

export default Notes