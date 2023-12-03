import React, { memo, useState } from "react";
import { Link, Navigate } from "react-router-dom";

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

// Utils
import { onChange } from "../utils/utilities";

// Components
import WorkersList from "../components/Worker/WorkersList";
import WorkerForm from "../components/Worker/WorkerForm";
import ActivitiesList from "../components/Activity/ActivitiesList";
import ActivityForm from "../components/Activity/ActivityForm";
import SignInBadge from "../components/Root/SignInBadge";
import PlusButton from "../components/Root/PlusButton";

const MemoizedActivityForm = memo(ActivityForm);
const MemoizedWorkerForm = memo(WorkerForm);

const Assets = () => {
  // State
  const [create, setCreate] = useState({
    addEmployee: false,
    addService: false,
  });
  const [actvityData, setActivityData] = useState({
    title: "",
    color: "bg-sky-200",
  });
  const [workerData, setWorkerData] = useState({
    workerTitle: "",
    name: "",
  });
  const { color, title } = actvityData;
  const { name, workerTitle } = workerData;

  // APIs
  const [createActivity, { isCreateActivityLoading }] =
    useCreateActivityMutation();
  const [createWorker, { isCreateWorkerLoading }] = useCreateWorkerMutation();
  const {
    data: workers,
    isLoading: isWorkersLoading,
    isSuccess: isWorkersSuccess,
    isError: isWorkersError,
    error: workersError,
  } = useGetWorkersQuery();
  const {
    data: activities,
    isLoading: isActivitiesLoading,
    isSuccess: isActivitiesSuccess,
    isError: isActivitiesError,
    error: activitiesError,
  } = useGetActivitiesQuery();

  // Variables
  const user = localStorage.getItem("user");
  let content;
  const canWorkerSubmit =
    [workerTitle, name].every(Boolean) && !isCreateWorkerLoading;
  const canActivtySubmit =
    [title, color].every(Boolean) && !isCreateActivityLoading;

  // Func
  const handleActChange = onChange(setActivityData);
  const handleWorkerChange = onChange(setWorkerData);

  // Handle Service creation
  const onServiceSubmit = async (e) => {
    e.preventDefault();
    if (canActivtySubmit) {
      try {
        await createActivity({ title, color }).unwrap();
        setActivityData({
          title: "",
          color: "bg-sky-200",
        });
        setCreate({ addService: false });
        toast.success(`Activity  created`);
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      return toast.error("Check inputs");
    }
  };

  // Handle employee creation
  const onEmployeeSubmit = async (e) => {
    e.preventDefault();
    if (canWorkerSubmit) {
      try {
        await createWorker({ title: workerTitle, name }).unwrap();
        setWorkerData({
          workerTitle: "",
          name: "",
        });
        setCreate({ addEmployee: false });
        toast.success(`Worker created`);
      } catch (err) {
        toast.error(err.data);
      }
    } else {
      toast.error("Check inputs");
    }
  };

  // Response cases
  if (isActivitiesSuccess && isWorkersSuccess) {
    // If everythings fetched correctly
    content = (
      <div className="flex w-full pt-20">
        <div className="h-screen overflow-y-scroll w-1/2 assetColumn">
          <div className="m-2 p-2 bg-sky-900 text-gray-100 text-xs rounded">
            <p className="flex justify-between items-center">
              Services
              <PlusButton
                open={create.addService}
                onClick={(prev) =>
                  setCreate({ ...prev, addService: !create.addService })
                }
              />
            </p>
            {create.addService ? (
              <MemoizedActivityForm
                onChange={handleActChange}
                onSubmit={onServiceSubmit}
                inputProps={{ title, color }}
              />
            ) : (
              ""
            )}
          </div>
          <ActivitiesList activities={activities} />
        </div>
        <div className="h-screen overflow-y-scroll w-1/2 assetColumn">
          <div className="m-2 p-2 bg-sky-900 text-gray-100 text-xs rounded">
            <p className="flex justify-between items-center">
              Employees
              <PlusButton
                open={create.addEmployee}
                onClick={(prev) =>
                  setCreate({ ...prev, addEmployee: !create.addEmployee })
                }
              />
            </p>
            {create.addEmployee ? (
              <MemoizedWorkerForm
                onChange={handleWorkerChange}
                onSubmit={onEmployeeSubmit}
                inputProps={{ workerTitle, name }}
              />
            ) : (
              ""
            )}
          </div>
          <WorkersList workers={workers} />
        </div>
      </div>
    );
  } else if (isWorkersLoading || isActivitiesLoading) {
    // While loading
    content = <SignInBadge />;
  } else {
    // When error
    content = (
      <p className="mt-96 w-full text-gray-700 z-20 absolute text-center">
        {isActivitiesError
          ? activitiesError.data
          : isWorkersError
          ? workersError.data
          : "Unkown Error"}
        <p className="text-center">
          <Link to="/login">Go to Login Page</Link>
        </p>
      </p>
    );
  }

  return user ? content : <Navigate to="/" />;
};

export default Assets;
