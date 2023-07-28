import React, { useState } from 'react'
import RegisterForm from '../components/Auth/RegisterForm'
import { useRegisterMutation } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../features/auth/userSlice'


const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [Register, {isLoading}] = useRegisterMutation()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
    })
    const {name, email, password, confirm_password} = formData
    const canSubmit = [name, email, password, confirm_password].every(Boolean) && !isLoading;

    const onSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirm_password) {
          toast.error("Passwords don't match")
          return;
        }
        if (canSubmit) {
          localStorage.clear()
          try {
            await Register(formData)
            .then(result => {
              if (result.data.token) {
                localStorage.setItem("token", result.data.token)
                localStorage.setItem("user", `${result.data.email}`)
                dispatch(setUser(result.data.email))
                navigate("/today")
                toast.success(`Welcome ${result.data.name}`)
              }
            }).catch(err => {
              throw new Error(err.message)
            })
            
          } catch (err) {
            toast.error(err.message)
          }
        }
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

  return (
    <div className='mt-44 flex justify-center items-center'>
      <RegisterForm onSubmit={onSubmit} onChange={onChange} inputProps={{ name, email, password, confirm_password }} />
    </div>
  )
}

export default Register