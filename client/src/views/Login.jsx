import React from 'react'
import { useLoginMutation } from '../features/auth/authSlice'
import { useState } from 'react'
import LoginForm from '../components/Auth/LoginForm'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/auth/userSlice'

const Login = () => {
  const user = localStorage.getItem("user")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [Login, { isLoading }] = useLoginMutation()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData
  const canSubmit = [email, password].every(Boolean);
  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (canSubmit) {
        await Login(formData)
        .then((result) => {
          if (result.error) throw new Error(result.error.data)
          if (result.data?.token) {
            localStorage.setItem("token", result.data.token)
            localStorage.setItem("user", `${result.data.email}`)
            dispatch(setUser(result.data.email))
            navigate("/today")
            toast.success(`Welcome back ${result.data.name}`)
          } 
        }).catch(err => {
          throw new Error(err)
        })
      } else {
        toast.error("Fill the blanks please")
      }  
    } catch (err) {
      toast.error(err.message)
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    })
  )}

  return (
    <div className='mt-44 flex justify-center items-center'>
      {user ? (
        <div>You're already logged in...</div>
      ):(
        <LoginForm onSubmit={onSubmit} onChange={onChange} setLoading={setLoading} inputProps={{email, password, loading}} />
      )}
    </div>
  )
}

export default Login