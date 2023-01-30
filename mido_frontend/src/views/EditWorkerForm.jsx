import React from 'react'
import { useState } from 'react';
import { resolvePath, useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetOnePersonQuery, useUpdatePersonMutation } from '../features/api/apiSlice';
import { toast } from 'react-toastify';


const EditWorkerForm = () => {
    console.log('RENDERING EDIT FORM')
    const params = useParams()
    const personId = params.id
    const { data: person, isLoading, isSuccess, isError, error } = useGetOnePersonQuery(personId)
    const navigate = useNavigate()
    
    const [personData, setPersonData] = useState({
        name: '', 
        address: '', 
        age: ''
    })
    const { name, address, age} = personData
    const [updatePerson, { isLoading: isUpdateLoading }] = useUpdatePersonMutation()
    const canSave = [name, address, age].every(Boolean) && !isLoading;

    const onSubmit = async(e) => {
        e.preventDefault()
        if (canSave && !isUpdateLoading && person?._id) {
            const updatedData = { name, address, age }
            await updatePerson({updatedData, id: personId})
            navigate(`/workers/${personId}`)
        }
    }

    useEffect(() => {
        if (isSuccess) setPersonData({ name: person.name, address: person.address, age: person.age })
    }, [isSuccess])

    const onChange = (e) => {
        setPersonData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        })
    )}

    let content;

    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        content = <form onSubmit={onSubmit}>
            <input type="text" placeholder='name' onChange={onChange} value={name} name='name' />
            <input type="text" placeholder='address' onChange={onChange} value={address} name='address' />
            <input type="number" onChange={onChange} value={age} name='age' />
            <button type='submit'>save</button>
        </form> 
    } else if (isError) {
        content = null;
        return toast.error(error.data)
    }    

  return (
    <div>
        <h4>EditWorkerForm</h4>
        <Link to="/">home</Link>
        {content}
    </div>
  )
}

export default EditWorkerForm