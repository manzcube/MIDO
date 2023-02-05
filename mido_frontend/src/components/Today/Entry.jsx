// Lib
import React, { useState, memo } from 'react'

// Toast
import { toast } from 'react-toastify';
// Utils
import { getBgColor } from '../../utils/utilities';

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
            const { name, title, picture } = parsedData
            if (!isUpdateLoading) {
                await updateDay({ id: dayId, body: { type: "worker", activityId: activity._id, newEntry: { title, name, picture }}})
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
            <div className='text-black mr-3 flex'>
                {activity.schedule}
            </div>
            <div className={`${activity.color} flex justify-between p-3 rounded-md my-4 w-full max-w-5xl shadow-md`}>
                <div className='w-1/5'>
                    <p className='p-1 uppercase font-bold text-gray-800'>{activity.title}</p>
                    <p className='p-1 mx-2 text-sm text-gray-600'>Duration: {activity.duration}</p>
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
                    className={`w-4/5 ml-5 border flex flex-wrap rounded-md my-2 mr-3 focus:border-gray-800 ${getBgColor(activity.color)}`}
                >
                    {activity.workers?.map(worker => (
                    <DroppedWorker dayId={dayId} activityId={activity._id} key={activity.workers.indexOf(worker)} worker={worker} />
                    ))}
                </div>
            </div>
            <button onClick={() => submitChange("deleteActivity")} className='mx-3 bg-red-600 text-sm text-white p-1 rounded-md'>
                delete
            </button>
        </div>
    )
}

export default Entry