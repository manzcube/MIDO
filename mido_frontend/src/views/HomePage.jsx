import React, { memo, useState, useCallback } from 'react'
import WorkersList from '../components/WorkersList'
import { useSetPersonMutation } from '../features/api/apiSlice'
import { useMemo } from 'react'
import { toast } from 'react-toastify'


// To avoid child re-rendering on input values change
const MemoizedWorkersList = memo(WorkersList)

const Home = () => {
    console.log('RENDERING HOME')
    // const initialDataValue = {
    //     name: '',
    //     address: '',
    //     age: '',
    // }
    // const [workerData, setWorkerData] = useState(initialDataValue)
    // const { name, address, age } = workerData
    
    // const [setPerson, { isLoading }] = useSetPersonMutation()
    // const canSave = [name, address, age].every(Boolean) && !isLoading;
    
    // const onChange = useCallback((e) => {
    //     setWorkerData((prevState) => ({
    //         ...prevState,
    //         [e.target.name]: e.target.value
    //     }))
    // }, [setWorkerData])

    // const createPerson = async (e) => {
    //     e.preventDefault()
    //     if (canSave) {
    //         try {
    //             await setPerson({ name, address, age }).unwrap()

    //             setWorkerData(initialDataValue)
                
    //         } catch (err) {
    //             toast.error(err.message)
    //         }
    //     }
    // }

  return (
    <>
        <h2>Home</h2>
        {/* <form>
            <input type="text" placeholder='name' onChange={onChange} value={name} name='name' required />
            <input type="text" placeholder='address' onChange={onChange} value={address} name='address' required />
            <input type="number" onChange={onChange} value={age} name='age' required />
            <button onClick={createPerson}>create worker</button>
        </form>  */}
        <MemoizedWorkersList />
    </>
  )
}

export default Home