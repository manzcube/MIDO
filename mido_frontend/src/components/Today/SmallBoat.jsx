
import { getTextColor } from "../../utils/utilities"
import boat from "../../utils/boat.png"

const SmallBoat = ({ name, color, id }) => {

    const textColor = getTextColor(color)
    console.log(textColor)

    const dataToDrag = {
      type: "boat",
      name,
      color,
    }

    const onGrab = (e) => {
      e.dataTransfer.setData("text", JSON.stringify(dataToDrag))
    }

    return (
        <div 
            id={id} 
            draggable 
            onDragStart={e => onGrab(e)} 
            className={`${color} w-24 flex flex-col justify-between p-1 rounded-md m-4 shadow-md cursor-grab hover:shadow-xl hover:scale-105 transition-all duration-200`}
        >
            <img src={boat} className="w-10" alt="" />
            <p className={`px-1 camelcase font-bold text-xs ${textColor}`}>{name}</p>
        </div>
    )
}

export default SmallBoat