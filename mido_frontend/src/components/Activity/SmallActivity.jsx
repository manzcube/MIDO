
const SmallActivity = ({activity}) => {
    const dataToDrag = {
      type: "activity",
      id: activity._id,
      title: activity.title,
      color: activity.color,
      schedule: activity.schedule,
    }

    const onGrab = (e) => {
      e.dataTransfer.setData("text", JSON.stringify(dataToDrag))
    }

    return (
        <div 
            id={activity._id} 
            draggable 
            onDragStart={e => onGrab(e)} 
            className={`${activity.color} flex flex-col justify-between p-3 rounded-md my-4 max-w-md shadow-md cursor-grab`}
        >
            <div className='flex justify-between items-center mb-2'>
                <p className='p-1 uppercase font-bold text-gray-800'>{activity.title}</p>
                
            </div>
            <div className='flex justify-between'>
            <p className='p-1 text-gray-800'>{activity.schedule}</p>
            </div>
        </div>
    )
}

export default SmallActivity