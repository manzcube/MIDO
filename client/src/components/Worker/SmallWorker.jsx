import React from 'react'
import "./Worker.css"

const SmallWorker = ({ worker }) => {

    const dataToDrag = {
      type: "worker",
      id: worker.id,
      name: worker.name,
      title: worker.title,
    }
    
    const onGrab = (e) => {
        e.dataTransfer.setData("text", JSON.stringify(dataToDrag))
    }

    return (
        <div 
        draggable
        onDragStart={e => onGrab(e)}
        id={worker.id} 
        className="w-14 h-14 flex flex-col justify-center p-2 rounded-xl m-2 shadow-md hover:scale-105 transition-all duration-100 bg-slate-800 cursor-grab"
        >
            <p className='uppercase text-lg text-center font-bold text-white'>{worker.name[0]}{worker.name[1]}</p>
            <p className='small-worker-text text-gray-300 overflow-x-clip'>{worker.title}</p>              
        </div>
    )
}

export default SmallWorker