import React from 'react'
import "./Worker.css"

// Utils
import { default_pic } from '../../utils/utilities'

const SmallWorker = ({ worker }) => {

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
        className="w-20 h-20 flex flex-col justify-center p-2 rounded-xl m-2 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-200 bg-slate-800 cursor-grab"
        >
            <p className='uppercase text-4xl text-center font-bold text-white'>{worker.name[0]}</p>
            <p className='text-xs text-gray-300 overflow-x-clip'>{worker.title}</p>              
        </div>
    )
}

export default SmallWorker