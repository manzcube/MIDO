import React, { memo, useEffect } from 'react';
import { toast } from "react-toastify";
import { useGetWorkersQuery } from "../../features/workers/workerSlice.js";
import SingleWorker from './SingleWorker.jsx';

const MemoizedSingleWorker = memo(SingleWorker)

const WorkersList = () => {
  console.log('WORKERS LIST')
  const token = localStorage.getItem("token")
  const { data: workers, isLoading, isSuccess, isError, error, refetch } = useGetWorkersQuery()
  let content;
  console.log(token)
  useEffect(() => {
    refetch()
  }, [token])

  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isSuccess) {
    content = workers.map(worker => <MemoizedSingleWorker key={worker._id} worker={worker} />)
  } else if (isError) {
    content = "No Content";
    return toast.error(error.data)
  }
  
    
  return (
    <div className='flex flex-wrap'>
        {content}
    </div>
  )
}

export default WorkersList