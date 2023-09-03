import React, { memo, useState } from "react";

// Toast
import { toast } from "react-toastify";

// Endpoint
import {
  useCreateWorkerMutation,
  useGetWorkersQuery,
} from "../features/workers/workerSlice";
import {
  useCreateActivityMutation,
  useGetActivitiesQuery,
} from "../features/activities/activitySlice";

// Components
import WorkersList from "../components/Worker/WorkersList";
import WorkerForm from "../components/Worker/WorkerForm";
import ActivitiesList from "../components/Activity/ActivitiesList";
import ActivityForm from "../components/Activity/ActivityForm";
import { onChange } from "../utils/utilities";

const MemoizedActivityForm = memo(ActivityForm);
const MemoizedWorkerForm = memo(WorkerForm);

const Assets = () => {
  const [actvityData, setActivityData] = useState({
    title: "",
    color: "",
  });
  const [workerData, setWorkerData] = useState({
    workerTitle: "",
    name: "",
  });

  const { color, title } = actvityData;
  const { name, workerTitle } = workerData;

  const handleActChange = onChange(setActivityData);
  const handleWorkerChange = onChange(setWorkerData);

  let content;
  const {
    data: workers,
    isLoading: isWorkersLoading,
    isSuccess: isWorkersSuccess,
    isError: isWorkersError,
    error: workersError,
  } = useGetWorkersQuery();
  const [createWorker, { isCreateWorkerLoading }] = useCreateWorkerMutation();
  const {
    data: activities,
    isLoading: isActivitiesLoading,
    isSuccess: isActivitiesSuccess,
    isError: isActivitiesError,
    error: activitiesError,
  } = useGetActivitiesQuery();

  const [createActivity, { isCreateActivityLoading }] =
    useCreateActivityMutation();

  const canWorkerSubmit =
    [workerTitle, name].every(Boolean) && !isCreateWorkerLoading;
  const canActivtySubmit =
    [title, color].every(Boolean) && !isCreateActivityLoading;

  const onActivitySubmit = async (e) => {
    e.preventDefault();
    if (canActivtySubmit) {
      try {
        await createActivity({ title, color }).unwrap();
        setActivityData({
          title: "",
          color: "bg-sky-200",
        });
        toast.success(`Activity  created`);
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      toast.error("Check inputs");
    }
  };

  // Handle worker creation
  const onWorkerSubmit = async (e) => {
    e.preventDefault();
    if (canWorkerSubmit) {
      try {
        await createWorker({ title: workerTitle, name }).unwrap();
        setWorkerData({
          workerTitle: "",
          name: "",
        });
        toast.success(`Worker created`);
      } catch (err) {
        toast.error(err.data);
      }
    } else {
      toast.error("Check inputs");
      console.log(canWorkerSubmit, workerTitle, name, isCreateWorkerLoading);
    }
  };

  if (isActivitiesSuccess && isWorkersSuccess) {
    content = (
      <div className="flex w-full pt-20">
        <div className="h-screen overflow-y-scroll w-1/2 assetColumn">
          Services
          <MemoizedActivityForm
            onChange={handleActChange}
            onSubmit={onActivitySubmit}
            inputProps={{ title, color }}
          />
          <ActivitiesList activities={activities} />
        </div>
        <div className="h-screen overflow-y-scroll w-1/2 assetColumn">
          Employees
          <MemoizedWorkerForm
            onChange={handleWorkerChange}
            onSubmit={onWorkerSubmit}
            inputProps={{ workerTitle, name }}
          />
          <WorkersList workers={workers} />
        </div>
      </div>
    );
  } else if (isWorkersLoading || isActivitiesLoading) {
    content = "Loading";
  } else {
    content = "error";
  }

  return content;
};

export default Assets;
