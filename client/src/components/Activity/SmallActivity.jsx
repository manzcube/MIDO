import { getTextColor } from "../../utils/utilities";
import DragDropIcon from "./DragDropIcon";

const SmallActivity = ({ activity }) => {
  const textColor = getTextColor(activity.color);

  const dataToDrag = {
    type: "activity",
    id: activity._id,
    title: activity.title,
    color: activity.color,
  };

  const onGrab = (e) => {
    e.dataTransfer.setData("text", JSON.stringify(dataToDrag));
  };

  return (
    <div
      id={activity._id}
      draggable
      onDragStart={(e) => onGrab(e)}
      className={`${activity.color} flex flex-col justify-between p-1 rounded-md m-4 shadow-md cursor-grab transition-all duration-200`}
    >
      <div className="flex items-center">
        <DragDropIcon color={activity.color} />
        <p className={`p-1 capitalize text-xs ${textColor}`}>
          {activity.title}
        </p>
      </div>
    </div>
  );
};

export default SmallActivity;
