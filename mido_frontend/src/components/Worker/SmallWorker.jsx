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
        className="smallWorker flex flex-col border p-3 rounded-xl m-4 shadow-md bg-slate-700 cursor-grab"
        >
            <div className='w-full flex justify-center mb-2'>
                <img src={worker.picture ? worker.picture : default_pic}
                    alt="" 
                    className='flex rounded-full w-20 h-20 object-cover' 
                />
            </div>
            <div className='items-start'>
                <p className='uppercase text-xs text-white'>{worker.name}</p>
                <p className='text-xs text-gray-300 overflow-x-clip'>{worker.title}</p>
            </div>                
        </div>
    )
}

export default SmallWorker