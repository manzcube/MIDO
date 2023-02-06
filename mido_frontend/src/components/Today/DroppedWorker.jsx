import React from 'react'

// Utils
import { default_pic } from '../../utils/utilities'
import { useUpdateDayMutation } from '../../features/today/todaySlice'
import { toast } from 'react-toastify'

const DroppedWorker = ({ worker, dayId, activityId }) => {  
    const [updateDay, { isLoading }] = useUpdateDayMutation()

    // Handling drop
    async function drop(e) {
        e.preventDefault()
        let data = e.dataTransfer.getData("text") 
        const parsedData = JSON.parse(data)
        if (parsedData.type === "role") {
            const { name, language } = parsedData
            if (!isLoading) {
                return await updateDay({ id: dayId, body: { type: "role", activityId, workerId: worker._id, newEntry: { name, language }}}).unwrap()
            } else {
                toast.error("Something is loading, wait a minute")
            }
        } 
    } 

    return (
        <div draggable={false} className="flex space-x-3 border p-3 rounded-xl m-4 shadow-md bg-slate-700">
            <div>
                <div className='w-full flex justify-center mb-2'>
                    <img src={worker.picture ? worker.picture : default_pic}
                        alt="" 
                        draggable={false}
                        className='flex rounded-full w-20 h-20 cursor-not-allowed object-cover' 
                    />
                </div>
                <div className='flex flex-col items-start overflow-clip'>
                    <p className='uppercase text-xs text-white'>{worker.name}</p>
                    <p className='text-xs text-gray-300'>{worker.title}</p>
                </div>  
            </div>   
            <div onDrop={e => drop(e)} onDragOver={e => e.preventDefault()} className='border p-2 border-dashed w-28' >
                {worker.roles.map(role => (
                    <div key={worker.roles.indexOf(role)} className='p-1 bg-white text-gray-800 rounded-md text-xs m-1'>
                        <p className='font-bold'>{role.name}</p>
                        <p>{role.language}</p>
                    </div>
                ))}
            </div>           
        </div>
    )
  }

export default DroppedWorker