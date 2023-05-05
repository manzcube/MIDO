import React, { memo } from 'react'
import { useGetWorkersQuery } from '../features/workers/workerSlice';
import SmallWorker from '../components/Worker/SmallWorker';
import Pick  from "../components/Pickup/Pick"
import SignInBadge from '../components/Root/SignInBadge';
import { Navigate } from 'react-router-dom';


const MemoizedSmallWorker = memo(SmallWorker)

const Pickups = () => {

  // Query
  const user = localStorage.getItem("user")

  const { data: workers, isLoading, isSuccess, isError, error } = useGetWorkersQuery()
  let content;
  
  if (isLoading) {
    content = <SignInBadge />
  } else if (isSuccess) {
    let selectDrivers = workers.filter(worker => worker.title === "driver")
    const currentDrivers = selectDrivers.map(worker => <MemoizedSmallWorker key={worker._id} draggable={true} worker={worker} />)
    content = <Pick content={currentDrivers} />
  } else if (isError) {
    content = <p className='mt-96 w-full text-gray-700 z-20 absolute text-center'>{error.data}</p>
  }

  return user ? content : <Navigate to="/" />
}

export default Pickups