import React from 'react'

// Utils
import { useUpdateDayMutation } from '../../features/today/todaySlice'
import { toast } from 'react-toastify'

const DroppedWorker = ({ worker, dayId, activityId, pos }) => {  
    const [updateDay, { isLoading }] = useUpdateDayMutation()
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
        <div draggable={false} className={`w-11 h-11 p-1 rounded-lg m-1 bg-slate-800 relative ${pos === 0 ? "mr-6": ""}`}>
            <button onClick={() => submitChange("deleteWorker")} className="text-white absolute z-10 right-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 hover:bg-white rounded-full hover:text-gray-700 transition-all duration-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <p className='uppercase absolute top-2 p-1 text-xl text-center font-bold text-white'>{worker.name[0]}{worker.name[1]}</p>
        </div>
    )
  }

export default DroppedWorker