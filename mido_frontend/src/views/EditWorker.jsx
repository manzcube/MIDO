// Lib
import React, { useState, memo, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

// Utils
import { onChange } from '../utils/utilities'

// Toast
import { toast } from 'react-toastify'

// Endpoint
import { useGetOneWorkerQuery, useUpdateWorkerMutation } from '../features/workers/workerSlice'

// Components
import WorkerForm from '../components/Worker/WorkerForm'
import SignInBadge from '../components/Root/SignInBadge'

// Memo
const MemoizedWorkerForm = memo(WorkerForm)

const EditWorker = () => {
    const user = localStorage.getItem("user")
    const navigate = useNavigate()
    const params = useParams()
    const workerId = params.id

    const { data: worker, isSuccess, isError, isLoading, error } = useGetOneWorkerQuery(workerId)
    const [updateWorker, { isLoading: isUpdateLoading }] = useUpdateWorkerMutation()
    
    const [formData, setFormData] = useState({
        title: '',
        name: '',
    })
    const { title, name, picture } = formData

    const handleChange = onChange(setFormData)
    const canSubmit = [title, name].every(Boolean) && !isUpdateLoading;
    let content;

    // Re-render for data
    useEffect(() => {
        if (isSuccess) {
            setFormData({
                title: worker.title,
                name: worker.name,
            })
        }
    }, [isSuccess])

    // Handle update
    const onSubmit = async(e) => {
        e.preventDefault()
        if (canSubmit) {
            try {
                const updatedData = { title, name }
                await updateWorker({ updatedData, id: workerId }).unwrap()
                navigate("/workers")
                toast.success("Worker updated")
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
        content = <MemoizedWorkerForm onChange={handleChange} onSubmit={onSubmit} title="Edit Worker" inputProps={{ title, name }}  />
    } else if (isError) {
        content = "Sign in please"
    }

  return user ? (
    <div className='mt-44 flex justify-center items-center'>
        {content}
    </div>
  ) : <Navigate to="/" />
}

export default EditWorker