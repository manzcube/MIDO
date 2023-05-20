// Lib
import React, { useState, memo } from 'react'

// Toast
import { toast } from 'react-toastify';
// Utils
import { getBgColor, getTextColor } from '../../utils/utilities';

// Endpoint
import { useUpdateDayMutation } from '../../features/today/todaySlice'

// Components
import DroppedWorker from "./DroppedWorker";
import Comments from './Comments';

const MemoizedComments = memo(Comments)

const Entry = ({activity, dayId}) => {
    const [changing, setChanging] = useState(false)
    const [commentsData, setCommentsData] = useState(activity.comments)
    const [updateDay, {isLoading: isUpdateLoading }] = useUpdateDayMutation()
    const textColor = getTextColor(activity.color)
  
    const onChange = (e) => {
      setChanging(true)
      setCommentsData(() => e.target.value)
    }

    // Handling deletion or comments update
    const submitChange = async (type) => {
        if (!isUpdateLoading) {
            await updateDay({ id: dayId, body: { type, activityId: activity._id, newEntry: { comments: commentsData }}})
            .then(() => {
              setChanging(false)
            }).catch(err => toast.error(err.data))
        } else {
            toast.error("Something is wrong, try again in a minute")
        }
    }  
  
    // Handling drop
    async function drop(e) {
      e.preventDefault()
      let data = e.dataTransfer.getData("text") 
      const parsedData = JSON.parse(data)
        if (parsedData.type === "worker") {
            const { name, title } = parsedData
            if (!isUpdateLoading) {
                await updateDay({ id: dayId, body: { type: "worker", activityId: activity._id, newEntry: { title, name }}})
                .then(() => {
                    setChanging(false)
                }).catch(err => toast.error(err.data))
            } else {
                toast.error("Something is wrong, try again in a minute")
            }
        }      
    }
  
  
    return (
        <div className={`${activity.color} flex rounded-md my-4 w-full shadow-md`}>
            <div className='p-2 w-full'>
                <p className={`uppercase font-bold text-xs lg:text-md ${textColor}`}>{activity.title}</p>
                <div className='w-full'>
                    <MemoizedComments 
                        onSave={() => submitChange("comments")} 
                        value={commentsData}
                        onChange={onChange}
                        changing={changing} 
                    />
                </div>
            </div>
            <div 
                onDrop={e => drop(e)} 
                onDragOver={e => e.preventDefault()}  
                className={`w-full my-2 border flex flex-wrap rounded-lg border-white ${getBgColor(activity.color)}`}
            >
                <div className='flex gap-4 w-full px-1'>
                    <p className={`uppercase font-bold text-xs lg:text-md ${textColor}`}>CAPTAIN</p>
                    <p className={`uppercase font-bold text-xs lg:text-md ${textColor}`}>STAFF</p>  
                </div>
                {activity.workers?.map(worker => (
                <DroppedWorker dayId={dayId} activityId={activity._id} key={activity.workers.indexOf(worker)} worker={worker} />
                ))}
            </div>
            <div className=''>
                <button onClick={() => submitChange("deleteActivity")} className={`${textColor}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 m-1 hover:bg-red-400 hover:rounded-full hover:text-white transition-all duration-200">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Entry