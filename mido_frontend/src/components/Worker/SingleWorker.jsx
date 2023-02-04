import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDeleteWorkerMutation } from '../../features/workers/workerSlice'
import { toast } from 'react-toastify'

const SingleWorker = ({ worker }) => {
    const [sureToDelete, setSureToDelete] = useState(false)
    const [deleteWorker, { isLoading }] = useDeleteWorkerMutation()
    const canDelete = worker?._id && !isLoading;
    const default_pic = "https://imgs.search.brave.com/UOHewl77s_cOrxcg1FpDaocIjjuonwgezaN4DtbAPp4/rs:fit:800:800:1/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9zZWFo/b3JzZS1pY29uLXNl/YWhvcnNlLW9jZWFu/LWFuaW1hbC1vdXRs/aW5lLWljb24tbG9n/by12ZWN0b3ItaWxs/dXN0cmF0aW9uLTE4/MTQ4Mjg2OS5qcGc"

    const onDeleteWorker= async() => {
        if(canDelete) {
            try {
                await deleteWorker(worker._id).unwrap()
                toast.success("worker deleted")
            } catch (err) {
                toast.error(err.data)
            }
        }        
    }

    return (
        <div className="border p-3 rounded-xl m-4 w-52 h-56 shadow-md bg-gray-800">
            <div className='w-full flex justify-center mb-2'>
                <img src={worker.picture ? worker.picture : default_pic}
                    alt="" 
                    className='flex rounded-full w-32 h-32' 
                />
            </div>
            <div className='flex flex-col items-start overflow-clip'>
                <p className='uppercase text-sm font-bold text-white'>{worker.name}</p>
                <p className='text-xs text-gray-300'>{worker.title}</p>
            </div>                
            <div className='flex justify-end'>
                {sureToDelete ? (
                    <>
                        <button onClick={onDeleteWorker} className='py-1 px-2 rounded-md bg-red-500 text-white text-xs'  onBlur={() => setSureToDelete(false)} >
                            Sure?
                        </button>
                        <button className='py-1 px-2 ml-1 rounded-md bg-gray-500 text-white text-xs' onClick={() => setSureToDelete(false)}>cancel</button>
                    </>
                        
                    ) : (
                        <>
                            <Link to={`/workers/edit/${worker._id}`} className='mx-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>
                            </Link>
                            <button onClick={() => setSureToDelete(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </>
                    )
                }
            </div>   
        </div>
    )
}

export default SingleWorker