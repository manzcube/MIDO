import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDeleteRoleMutation } from '../../features/roles/roleSlice'
import { toast } from 'react-toastify'

const SingleRole = ({ role }) => {
    const [sureToDelete, setSureToDelete] = useState(false)
    const [deleteRole, { isLoading }] = useDeleteRoleMutation()
    const canDelete = role?._id && !isLoading;

    const dataToDrag = {
        type: "role",
        id: role.id,
        name: role.name,
        language: role.language,
    }
    
    const onGrab = (e) => {
        e.dataTransfer.setData("text", JSON.stringify(dataToDrag))
    }

    const onDeleteRole= async() => {
        if(canDelete) {
            try {
                await deleteRole(role._id).unwrap()
                toast.success("role deleted")
            } catch (err) {
                toast.error(err.data)
            }
        }        
    }

    return (
        <div 
        draggable
        onDragStart={e => onGrab(e)} 
        className="border p-3 rounded-xl my-3 w-28 shadow-md bg-gray-800 cursor-grab"
        >
            <div className='flex flex-col items-start overflow-clip mb-2'>
                <p className='uppercase text-xs mb-2 text-white'>{role.name}</p>
                <p className='uppercase text-xs text-gray-300'>{role.language}</p>
            </div>                
            <div className='flex justify-end'>
                {sureToDelete ? (
                    <>
                        <button onClick={onDeleteRole} className='py-1 px-2 rounded-md bg-red-500 text-white text-xs'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </button>
                        <button className='py-1 px-2 ml-1 rounded-md bg-gray-500 text-white text-xs' onClick={() => setSureToDelete(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </>
                        
                    ) : (
                        <button onClick={() => setSureToDelete(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                    )
                }
            </div>   
        </div>
    )
}

export default SingleRole