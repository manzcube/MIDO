// Lib
import React, { useState, memo } from "react";

// Toast
import { toast } from "react-toastify";
// Utils
import { getBgColor, getTextColor } from "../../utils/utilities";

// Endpoint
import { useUpdateDayMutation } from "../../features/today/todaySlice";

// Components
import DroppedWorker from "../Today/DroppedWorker";
import Comments from "../Today/Comments";
import Booking from "../Bookings/Booking";

const MemoizedComments = memo(Comments);

const Entry = ({ activity, dayId, bookings }) => {
  const [changing, setChanging] = useState(false);
  const [addingComments, setAddingComments] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  const [boat, setBoat] = useState(activity.boat);
  const [commentsData, setCommentsData] = useState(activity.comments);
  const [updateDay, { isLoading: isUpdateLoading }] = useUpdateDayMutation();
  const filteredBookings = bookings?.filter(
    (book) => book.activity.split(" ")[0] === activity.title.toUpperCase()
  );
  const textColor = getTextColor(activity.color);
  const onChange = (e) => {
    setChanging(true);
    setCommentsData(() => e.target.value);
  };

  // Handling deletion or comments update
  const submitChange = async (type) => {
    setAddingComments(false);
    if (!isUpdateLoading) {
      await updateDay({
        id: dayId,
        body: {
          type,
          activityId: activity._id,
          newEntry: { comments: commentsData },
        },
      })
        .then(() => {
          setChanging(false);
        })
        .catch((err) => toast.error(err.data));
    } else {
      toast.error("Something is wrong, try again in a minute");
    }
  };

  const updateBoat = async (e) => {
    setBoat(e.target.value);
    await updateDay({
      id: dayId,
      body: {
        type: "boat",
        activityId: activity._id,
        newEntry: { boat: e.target.value },
      },
    });
  };

  // Handling drop
  async function drop(e) {
    e.preventDefault();
    let data = e.dataTransfer.getData("text");
    const parsedData = JSON.parse(data);
    if (parsedData.type === "worker") {
      const { name, title } = parsedData;
      if (!isUpdateLoading) {
        await updateDay({
          id: dayId,
          body: {
            type: "worker",
            activityId: activity._id,
            newEntry: { title, name },
          },
        })
          .then(() => {
            setChanging(false);
          })
          .catch((err) => toast.error(err.data));
      } else {
        toast.error("Something is wrong, try again in a minute");
      }
    }
  }

  return (
    <div
      className={`${activity.color} rounded-md my-4 w-full shadow-md relative`}
    >
      <div className="flex">
        <div className="p-2 w-full">
          <div
            className={`uppercase flex justify-between w-full font-bold text-xs lg:text-md ${textColor}`}
          >
            <p>{activity.title}</p>
            <select
              value={boat}
              className="outline-none rounded-md mb-2"
              onChange={updateBoat}
            >
              <option value="tortugueta">tortugueta</option>
              <option value="buzios">buzios</option>
              <option value="galapagos">galapagos</option>
              <option value="utila">utila</option>
            </select>
          </div>
          <div className="w-full flex justify-between items-center">
            {addingComments ? (
              <MemoizedComments
                onSave={() => submitChange("comments")}
                value={commentsData}
                onChange={onChange}
                changing={changing}
              />
            ) : (
              <button
                className={`text-xs mr-3 ${textColor}`}
                onClick={() => setAddingComments(!addingComments)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
              </button>
            )}
            {!addingComments && activity.comments ? (
              <p className={`text-xs ${textColor}`}>{activity.comments}</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div
          onDrop={(e) => drop(e)}
          onDragOver={(e) => e.preventDefault()}
          className={`w-full my-2 border flex flex-wrap rounded-lg border-white ${getBgColor(
            activity.color
          )}`}
        >
          <div className={`flex gap-4 w-full px-1 ${textColor}`}>
            <p className="uppercase font-bold text-xs">CAPTAIN</p>
            <p className="uppercase font-bold text-xs">STAFF</p>
          </div>
          {activity.workers?.map((worker) => {
            const position = activity.workers.indexOf(worker);
            return (
              <DroppedWorker
                dayId={dayId}
                activityId={activity._id}
                pos={position}
                key={position}
                worker={worker}
              />
            );
          })}
        </div>
        <div>
          <button
            onClick={() => submitChange("deleteActivity")}
            className={`${textColor}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 m-1 hover:bg-red-400 hover:rounded-full hover:text-white transition-all duration-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      {filteredBookings.length ? (
        <p className="w-full flex justify-center absolute -bottom-3">
          <button
            onClick={() => setShowBookings(!showBookings)}
            className={`text-center ${activity.color} text-xs rounded-b-full px-1`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-4 h-4 ${textColor}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        </p>
      ) : (
        ""
      )}

      {showBookings ? (
        <div className={`w-full flex flex-wrap p-3 ${activity.color}`}>
          {filteredBookings.map((book, i) => (
            <Booking color={activity.color} book={book} key={i} />
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Entry;
