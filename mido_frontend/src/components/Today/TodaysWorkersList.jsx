// Lib
import React, { memo } from 'react';
import "./Today.css"
// Endpoint
import { useGetWorkersQuery } from "../../features/workers/workerSlice.js";

// Components
import SignInBadge from "../Root/SignInBadge.jsx"
import SmallWorker from "../Worker/SmallWorker.jsx";

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
    <div className='flex fixed top-20 -mt-1 z-10 w-full shadow-md bg-white overflow-x-scroll' id='today-workers-list'>
      {content}
    </div>
  )
}

export default TodaysWorkersList