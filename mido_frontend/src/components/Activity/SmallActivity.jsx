
import { getTextColor } from "../../utils/utilities"

const SmallActivity = ({activity}) => {

    const textColor = getTextColor(activity.color)

    const dataToDrag = {
      type: "activity",
      id: activity._id,
      title: activity.title,
      color: activity.color,
    }

    const onGrab = (e) => {
      e.dataTransfer.setData("text", JSON.stringify(dataToDrag))
    }

    return (
        <div 
            id={activity._id} 
            draggable 
            onDragStart={e => onGrab(e)} 
            className={`${activity.color} w-32 flex flex-col justify-between p-1 rounded-md m-4 shadow-md cursor-grab hover:shadow-xl hover:scale-105 transition-all duration-200`}
        >
            <p className={`p-1 uppercase text ${textColor}`}>{activity.title}</p>
        </div>
    )
}

export default SmallActivity