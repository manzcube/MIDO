import React from 'react'

// Utils
import { useUpdateDayMutation } from '../../features/today/todaySlice'
import { toast } from 'react-toastify'

const DroppedWorker = ({ worker, dayId, activityId }) => {  
    const [updateDay, { isLoading }] = useUpdateDayMutation()
    console.log(worker)
    // Handling drop
    async function submitChange(type) {
        if (!isLoading) {
            await updateDay({ id: dayId, body: { type, actId: activityId, workerId: worker._id}})
            .then((response) => {
              toast.success(response)
            }).catch(err => toast.error(err.data))
        } else {
            toast.error("Something is wrong, try again in a minute")
        }
    }

    return (
        <div draggable={false} className="w-24 h-24 flex flex-col justify-between p-2 rounded-xl m-3 bg-slate-800">
            <p className='text-end'>
                <button onClick={() => submitChange("deleteWorker")} className="text-white hover:bg-white rounded-full hover:text-gray-700 transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </p>
            
            <p className='uppercase text-4xl text-center -mt-4 font-bold text-white'>{worker.name[0]}</p>
            <p className='text-xs text-gray-300 overflow-x-clip'>{worker.title}</p>              
        </div>
    )
  }

export default DroppedWorker