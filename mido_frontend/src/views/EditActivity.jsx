import React, { useState, memo } from 'react'
import { useGetOneActivityQuery, useUpdateActivityMutation } from '../features/activities/activitySlice'
import ActivityForm from '../components/Activity/ActivityForm'
import { toast } from 'react-toastify'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'

const MemoizedActivityForm = memo(ActivityForm)

const EditActivity = () => {
    console.log('EDI ACTIVITY')
    const navigate = useNavigate()
    const params = useParams()
    const activityId = params.id
    const { data: activity, isSuccess, isError, isLoading, error } = useGetOneActivityQuery(activityId)
    const [updateActivity, { isLoading: isUpdateLoading }] = useUpdateActivityMutation()
    const [formData, setFormData] = useState({
        title: '',
        duration: '',
        price: '',
        color: 'bg-sky-100',
    })
    const { title, duration, price, color } = formData
    const canSubmit = [title, duration, price, color].every(Boolean) && !isUpdateLoading;
    let content

    useEffect(() => {
        if (isSuccess) {
            setFormData(prevState => ({
                ...prevState,
                title: activity.title,
                duration: activity.duration,
                price: activity.price,
                color: activity.color,
            }))
        }
    }, [isSuccess])

    const onSubmit = async(e) => {
        e.preventDefault()
        if (canSubmit) {
            try {
                const updatedData = { title, duration, price, color }
                await updateActivity({ updatedData, id: activityId }).unwrap()
                navigate("/activities")
            } catch (err) {
                toast.error(err.data)
            }
        }
    }

    const onChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    if (isLoading) {
        content = <div>Loading...</div>
    } else if (isSuccess) {
        content = <MemoizedActivityForm onChange={onChange} onSubmit={onSubmit} inputProps={{ title, duration, price, color, dropForm: true }}  />
    } else if (isError) {
        content = <div>{error.data}</div>
    }

  return (
    <div className='mt-44 flex justify-center items-center'>
        {content}
    </div>
  )
}

export default EditActivity