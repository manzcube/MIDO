import React, { memo, useState } from 'react'

// Toast
import { toast } from 'react-toastify'

// Components
import RoleForm from './RoleForm'
import RolesList from "./RolesList"
 // Endpoint
import {useCreateRoleMutation} from '../../features/roles/roleSlice'

// Utils
import { onChange } from '../../utils/utilities'

// Memo
const MemoizedRolesList = memo(RolesList)
const MemoizedRoleForm = memo(RoleForm)

const Roles = () => {
  const [createRole, { isLoading }] = useCreateRoleMutation()
  const [formData, setFormData] = useState({
    language: '',
    name: '',
  })
  const { name, language} = formData
  const canSubmit = [language, name].every(Boolean) && !isLoading;

  const handleChange = onChange(setFormData)

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
      <MemoizedRoleForm onChange={handleChange} onSubmit={onSubmit} inputProps={{ name, language }} />
      <MemoizedRolesList />
    </div>
  )
}

export default Roles