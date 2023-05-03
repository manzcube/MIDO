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
        <div className='flex w-full items-center'>
            <div className={`${activity.color} flex justify-between p-3 rounded-md my-4 w-full shadow-md`}>
                <div className='w-1/5'>
                    <p className={`p-1 uppercase font-bold ${textColor}`}>{activity.title}</p>
                    <MemoizedComments 
                        onSave={() => submitChange("comments")} 
                        value={commentsData}
                        onChange={onChange}
                        changing={changing} 
                    />
                </div>
                <div 
                    onDrop={e => drop(e)} 
                    onDragOver={e => e.preventDefault()}  
                    className={`w-4/5 ml-5 border flex flex-wrap items-center rounded-md my-2 mr-3 border-white ${getBgColor(activity.color)}`}
                >
                    {activity.workers?.map(worker => (
                    <DroppedWorker dayId={dayId} activityId={activity._id} key={activity.workers.indexOf(worker)} worker={worker} />
                    ))}
                </div>
                <div className=''>
                <button onClick={() => submitChange("deleteActivity")} className={`text-sm ${textColor} hover:bg-red-400 rounded-full hover:text-white transition-all duration-200`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                </div>
            </div>
            
        </div>
    )
}

export default Entry