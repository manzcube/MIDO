import React, { useState, memo } from 'react'
import { useGetOneWorkerQuery, useUpdateWorkerMutation } from '../features/workers/workerSlice'
import WorkerForm from '../components/Worker/WorkerForm'
import { toast } from 'react-toastify'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'

const MemoizedWorkerForm = memo(WorkerForm)

const EditWorker = () => {
    console.log('EDI WORKER')
    const navigate = useNavigate()
    const params = useParams()
    const workerId = params.id
    const { data: worker, isSuccess, isError, isLoading, error } = useGetOneWorkerQuery(workerId)
    const [updateWorker, { isLoading: isUpdateLoading }] = useUpdateWorkerMutation()
    const [formData, setFormData] = useState({
        title: '',
        name: '',
        picture: '',
    })
    const { title, name, picture } = formData
    const canSubmit = [title, name].every(Boolean) && !isUpdateLoading;
    let content;

    useEffect(() => {
        if (isSuccess) {
            setFormData(prevState => ({
                ...prevState,
                title: worker.title,
                name: worker.name,
                picture: worker.picture,
            }))
        }
    }, [isSuccess])

    const onSubmit = async(e) => {
        e.preventDefault()
        if (canSubmit) {
            try {
                const updatedData = { title, name, picture }
                await updateWorker({ updatedData, id: workerId }).unwrap()
                navigate("/workers")
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
        content = <MemoizedWorkerForm onChange={onChange} onSubmit={onSubmit} inputProps={{ title, name, picture, dropForm: true }}  />
    } else if (isError) {
        content = <div>{error.data}</div>
    }

  return (
    <div className='mt-44 flex justify-center items-center'>
        {content}
    </div>
  )
}

export default EditWorker