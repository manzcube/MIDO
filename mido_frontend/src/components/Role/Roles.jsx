import React, { memo, useState } from 'react'
import WorkerForm from '../Worker/WorkerForm'
import {useCreateRoleMutation} from '../../features/roles/roleSlice'
import { toast } from 'react-toastify'
import RolesList from "./RolesList"
import { useSelector } from 'react-redux'
import SignInBadge from "../Root/SignInBadge"
import { Navigate } from 'react-router-dom'
import RoleForm from './RoleForm'


const MemoizedRolesList = memo(RolesList)
const MemoizedRoleForm = memo(RoleForm)

const Roles = () => {
  const user = useSelector(state => state.user.user)
  const [createRole, { isLoading }] = useCreateRoleMutation()
  const [formData, setFormData] = useState({
    language: '',
    name: '',
  })
  const { name, language} = formData
  const canSubmit = [language, name].every(Boolean) && !isLoading;

  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    })
  )}

  const onSubmit = async (e) => {
    e.preventDefault()
    if (canSubmit) {
      try {
        await createRole({ language, name }).unwrap()
        setFormData({ 
          language: '',
          name: '',
        })
        toast.success(`Role created`)    
      } catch (err) {
        toast.error(err.data)
      }        
    } else {
      toast.error(`Something is wrong with your request`)
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <MemoizedRoleForm onChange={onChange} onSubmit={onSubmit} inputProps={{ name, language }} />
      <MemoizedRolesList />
    </div>
  )
}

export default Roles