// Lib
import React, { memo } from 'react';

// Components
import SingleWorker from './SingleWorker.jsx';

// Memo
const MemoizedSingleWorker = memo(SingleWorker)

const WorkersList = ({ workers }) => {
  return (
    <div className='flex flex-wrap gap-5'>
      {workers.map(worker => <MemoizedSingleWorker key={worker._id} worker={worker} />)}
    </div>
  )
}

export default WorkersList