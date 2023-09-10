// Lib
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

// Endpoint
import { useGetWorkersQuery } from "../features/workers/workerSlice";
import { useGetActivitiesQuery } from "../features/activities/activitySlice";
import {
  useGetTodayQuery,
  useUpdateDayMutation,
} from "../features/today/todaySlice";
import { useGetBookingsQuery } from "../features/bookings/bookingsSlice";

// Toast
import { toast } from "react-toastify";

// Components
import DayWorkersList from "../components/Today/DayWorkersList";
import DayActivitiesList from "../components/Today/DayActivitiesList";
import DayBookingsList from "../components/Today/DayBookingsList";
import TodaySelector from "../components/Today/TodaySelector";
import SignInBadge from "../components/Root/SignInBadge";
import DoubleShiftGrill from "../components/Grills/DoubleShiftGrill";

const Today = () => {
  let content;
  // Getting today's date
  const date = new Date().toISOString().split("T")[0];
  // Save it in a piece of state
  const [currentDate, setCurrentDate] = useState(date);
  // Queries and Mutations
  const {
    data: workers,
    isLoading: workersLoading,
    isSuccess: workersLoaded,
    isError: workersError,
    error: workersErr,
  } = useGetWorkersQuery();
  const {
    data: activities,
    isLoading: activitiesLoading,
    isSuccess: activitiesLoaded,
    isError: activitiesError,
    error: activitiesErr,
  } = useGetActivitiesQuery();
  const {
    data: day,
    isLoading: dayLoading,
    isSuccess: dayLoaded,
    isFetching,
    isError: dayError,
    error: dayErr,
  } = useGetTodayQuery(currentDate);
  const {
    data: bookings,
    isLoading: bookingsLoading,
    isSuccess: bookingsLoaded,
    isError: bookingsError,
    error: bookingsErr,
  } = useGetBookingsQuery(currentDate);
  const [updateDay, { isLoading: isUpdateDayLoading }] = useUpdateDayMutation();
  // Variable to check if there is anything loading
  let nothingLoading =
    !isUpdateDayLoading &&
    !dayLoading &&
    !bookingsLoading &&
    !workersLoading &&
    !activitiesLoading;
  // Set content depending on state of requests
  if (dayLoading || bookingsLoading || workersLoading || activitiesLoading) {
    content = <SignInBadge />;
  } else if (dayLoaded && bookingsLoaded && workersLoaded && activitiesLoaded) {
    //Set Day info
    content = (
      <>
        <TodaySelector
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        <DayWorkersList workers={workers} />
        <div className="w-full flex pt-28">
          <div className="p-10 pr-44 bg-gray-100 flex flex-col w-full">
            <DoubleShiftGrill bookings={bookings} oneDay={day} drop={drop} />
          </div>
          <DayActivitiesList activities={activities} />
        </div>
        <DayBookingsList bookings={bookings} />
      </>
    );
  } else if (dayError || workersError || bookingsError || activitiesError) {
    content = (
      <p className="mt-96 w-full text-gray-700 z-20 absolute text-center">
        {dayError
          ? dayErr.data
          : workersError
          ? workersErr.data
          : activitiesError
          ? activitiesErr.data
          : bookingsErr.data}
      </p>
    );
  }

  // Drop function
  async function drop(e, schedule) {
    e.preventDefault();
    let data = e.dataTransfer.getData("text");
    const parsedData = JSON.parse(data);
    if (parsedData.type === "activity") {
      const { title, color } = parsedData;
      if (nothingLoading) {
        try {
          await updateDay({
            id: day._id,
            body: {
              type: "activity",
              newEntry: {
                activityTitle: title,
                schedule,
                color,
              },
            },
          })
            .then((response) => toast.success(response))
            .catch((err) => {
              throw new Error(err.data);
            });
        } catch (err) {
          toast.error(err);
        }
      }
    }
  }

  return localStorage.getItem("user") ? (
    isFetching ? (
      <SignInBadge />
    ) : (
      content
    )
  ) : (
    <Navigate to="/" />
  );
};

export default Today;
