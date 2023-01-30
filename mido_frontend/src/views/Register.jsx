import React, { useState } from 'react'
import RegisterForm from '../components/RegisterForm'
import { useRegisterMutation } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Register = () => {
    console.log('register')
    const navigate = useNavigate()
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
            const result = await Register(formData)
            if (result.data.token) {
              localStorage.setItem("user", JSON.stringify({
                name: result.data.name,
                email: result.data.name,
                id: result.data._id,
                token: result.data.token,
              }))
              navigate("/today")
              toast.success(`Welcome ${result.data.name}`)
            }
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