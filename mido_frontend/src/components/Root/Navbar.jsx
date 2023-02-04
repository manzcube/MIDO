import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { removeUser, setUser } from '../../features/auth/userSlice';
import { apiSlice } from '../../features/api/apiSlice';


const Navbar = () => {
    const userFromStorage = localStorage.getItem("user")
    const dispatch = useDispatch()    
    const navigate = useNavigate()
    const [dropDown, setDropDown] = useState(false)
    const user = useSelector(state => state.user.user)
    
    useEffect(() => {
        if (userFromStorage) {
            dispatch(setUser(userFromStorage))
        }
    }, [dispatch])

    const logout = () => {
        localStorage.clear()
        dispatch(apiSlice.util.resetApiState())
        dispatch(removeUser())
        navigate("/")
        toast.success("Logged out!")
    }

    return (
        <React.Fragment>
            <nav className='h-10 drop-shadow-md text-black flex justify-between m-5 rounded'>
                <div className='ml-3 flex items-center'>
                    <Link to="/" className='decoration-0'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </Link>
                    <span className='mx-3 text-gray-700 '>{userFromStorage}</span>
                </div>
                <div className='mr-3 flex items-center'>
                    <div className='hidden md:flex'>
                        <Link to="/today" className='mx-3 p-2 rounded-lg hover:bg-gray-800 hover:text-white focus:underline'>Today</Link>
                        <Link to="/activities" className='mx-3 p-2 rounded-lg hover:bg-gray-800 hover:text-white focus:underline'>Activities</Link>
                        <Link to="/workers" className='mx-3 p-2 rounded-lg hover:bg-gray-800 hover:text-white focus:underline'>Workers</Link>
                        <Link to="/notifications" className='mx-3 p-2 rounded-lg hover:bg-gray-800 hover:text-white focus:underline'>Notifications</Link>
                        
                        {user ? (
                            <button onClick={logout} className='p-2'>Logout</button>
                        ) : (
                            <Link to="/login" className='p-2 mr-2'>Log in</Link>
                        )}  
                    </div>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:hidden  active:scale-90" onClick={() => setDropDown(!dropDown)} >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
                        </svg>
                    </button>
                </div>                  
            </nav>
            <div className={`${dropDown ? 'flex ' : 'hidden'} flex-col items-end p-5 mx-10 space-y-3 bg-gray-200 rounded-md text-gray-800 md:hidden`}>
                <Link to="/today" className='py-2 px-5 w-full text-end rounded hover:bg-gray-500 hover:text-white'>Today</Link>
                <Link to="/activities" className='py-2 px-5 w-full text-end rounded hover:bg-gray-500 hover:text-white'>Activities</Link>
                <Link to="/workers" className='py-2 px-5 w-full text-end rounded hover:bg-gray-500 hover:text-white'>Workers</Link>
                <Link to="/notifications" className='py-2 px-5 w-full text-end rounded hover:bg-gray-500 hover:text-white'>Notifications</Link>
                {user ? (
                    <button onClick={logout} className='py-2 px-5 w-full text-end rounded hover:bg-gray-500 hover:text-white'>Logout</button>
                ) : (
                    <Link to="/login" className='py-2 px-5 w-full text-end rounded hover:bg-gray-500 hover:text-white'>Login</Link>
                )}  
            </div>  
        </React.Fragment>
    )
}

export default Navbar