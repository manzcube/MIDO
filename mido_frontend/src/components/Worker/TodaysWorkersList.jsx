import React, { memo, useEffect } from 'react';
import { useGetWorkersQuery } from "../../features/workers/workerSlice.js";
import SingleWorker from './SingleWorker.jsx';
import SignInBadge from "../Root/SignInBadge.jsx"

export const SmallWorker = ({ worker }) => {
    const default_pic = "https://imgs.search.brave.com/UOHewl77s_cOrxcg1FpDaocIjjuonwgezaN4DtbAPp4/rs:fit:800:800:1/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9zZWFo/b3JzZS1pY29uLXNl/YWhvcnNlLW9jZWFu/LWFuaW1hbC1vdXRs/aW5lLWljb24tbG9n/by12ZWN0b3ItaWxs/dXN0cmF0aW9uLTE4/MTQ4Mjg2OS5qcGc"
    
    const dataToDrag = {
      type: "worker",
      id: worker.id,
      name: worker.name,
      title: worker.title,
      picture: worker.picture,
    }
    
    const onGrab = (e) => {
      e.dataTransfer.setData("text", JSON.stringify(dataToDrag))
    }

    return (
        <div 
        draggable
        onDragStart={e => onGrab(e)}
        id={worker.id} 
        className="border p-3 rounded-xl m-4 w-42 h-50 shadow-md bg-slate-700 cursor-grab"
        >
            <div className='w-full flex justify-center mb-2'>
                <img src={worker.picture ? worker.picture : default_pic}
                    alt="" 
                    className='flex rounded-full w-20 h-20' 
                />
            </div>
            <div className='flex flex-col items-start overflow-clip'>
                <p className='uppercase text-xs text-white'>{worker.name}</p>
                <p className='text-xs text-gray-300'>{worker.title}</p>
            </div>                
        </div>
    )
}

const TodaysWorkersList = () => {
  const { data: workers, isLoading, isSuccess, isError } = useGetWorkersQuery()
  let content;
  if (isLoading) {
    content = <SignInBadge />
  } else if (isSuccess) {
    content = workers.map(worker => <SmallWorker key={worker._id} worker={worker} />)
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