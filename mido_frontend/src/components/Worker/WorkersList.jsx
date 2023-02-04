import React, { memo, useEffect } from 'react';
import { useGetWorkersQuery } from "../../features/workers/workerSlice.js";
import SingleWorker from './SingleWorker.jsx';
import SignInBadge from "../Root/SignInBadge.jsx"

const MemoizedSingleWorker = memo(SingleWorker)

const WorkersList = () => {
  const { data: workers, isLoading, isSuccess, isError } = useGetWorkersQuery()
  let content;
  if (isLoading) {
    content = <SignInBadge />
  } else if (isSuccess) {
    content = workers.map(worker => <MemoizedSingleWorker key={worker._id} worker={worker} />)
  } else if (isError) {
    content = "Sign in please";
  }
    
  return (
    <div className='flex flex-wrap'>
        {content}
    </div>
  )
}

export default WorkersList