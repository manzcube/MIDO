// Lib
import React, { memo } from 'react';

// Endpoint
import { useGetWorkersQuery } from "../../features/workers/workerSlice.js";

// Components
import SignInBadge from "../Root/SignInBadge.jsx"
import SmallWorker from "./SmallWorker";

// Memo
const MemoizedSmallWorker = memo(SmallWorker)

const TodaysWorkersList = () => {
  // Query
  const { data: workers, isLoading, isSuccess, isError } = useGetWorkersQuery()
  let content;
  
  if (isLoading) {
    content = <SignInBadge />
  } else if (isSuccess) {
    content = workers.map(worker => <MemoizedSmallWorker key={worker._id} draggable={true} worker={worker} />)
  } else if (isError) {
    content = "Sign in please";
  }
    
  return (
    <div className='flex flex-col items-center'>
      {content}
    </div>
  )
}

export default TodaysWorkersList