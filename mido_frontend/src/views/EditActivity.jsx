// Lib
import React, { useState, memo, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

// Utils
import { onChange } from '../utils/utilities'

// Toast
import { toast } from 'react-toastify'

// Endpoint
import { useGetOneActivityQuery, useUpdateActivityMutation } from '../features/activities/activitySlice'

// Components
import ActivityForm from '../components/Activity/ActivityForm'
import SignInBadge from '../components/Root/SignInBadge'

// Memo
const MemoizedActivityForm = memo(ActivityForm)

const EditActivity = () => {
    const user = localStorage.getItem("user")
    const navigate = useNavigate()
    const params = useParams()
    const activityId = params.id

    const { data: activity, isSuccess, isError, isLoading, error, refetch } = useGetOneActivityQuery(activityId)
    const [updateActivity, { isLoading: isUpdateLoading }] = useUpdateActivityMutation()
    
    const [formData, setFormData] = useState({
        title: '',
        price: 0,
        color: "bg-sky-200",
        schedule: "08:00",
    })
    const { title, duration, price, color, schedule } = formData
    
    const handleChange = onChange(setFormData)
    const canSubmit = [title, color, schedule].every(Boolean) && !isUpdateLoading;
    let content
    // Re-render for data
    useEffect(() => {
        if (isSuccess) {
            setFormData(prevState => ({
                ...prevState,
                title: activity.title,
                color: activity.color,
                price: activity.price,
                schedule: activity.schedule
            }))
        }
    }, [isSuccess])

    // Handle update
    const onSubmit = async(e) => {
        e.preventDefault()
        if (canSubmit) {
            try {
                const updatedData = { title, price, color, schedule }
                await updateActivity({ updatedData, id: activityId }).unwrap()
                navigate("/activities")
                toast.success("Activity updated")
                refetch()
            } catch (err) {
                toast.error(err.data)
            }
        } else {
            toast.error("Check inputs")
        }
    }


    if (isLoading) {
        content = <SignInBadge />
    } else if (isSuccess) {
        content = <MemoizedActivityForm onChange={handleChange} onSubmit={onSubmit} inputProps={{ title, duration, price, schedule, color }}  />
    } else if (isError) {
        content = "Sign in please"
    }

  return user ? (
    <div className='mt-44 flex justify-center items-center'>
        {content}
    </div>
  ) : <Navigate to="/" />
}

export default EditActivity