// Lib
import React, { useState, memo, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

// Utils
import { onChange } from "../utils/utilities";

// Toast
import { toast } from "react-toastify";

// Endpoint
import {
  useGetOneWorkerQuery,
  useUpdateWorkerMutation,
} from "../features/workers/workerSlice";

// Components
import WorkerForm from "../components/Worker/WorkerForm";
import SignInBadge from "../components/Root/SignInBadge";

// Memo
const MemoizedWorkerForm = memo(WorkerForm);

const EditWorker = () => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const params = useParams();
  const workerId = params.id;

  const {
    data: worker,
    isSuccess,
    isError,
    isLoading,
    error,
    refetch,
  } = useGetOneWorkerQuery(workerId);
  const [updateWorker, { isLoading: isUpdateLoading }] =
    useUpdateWorkerMutation();

  const [formData, setFormData] = useState({
    workerTitle: "",
    name: "",
  });
  const { workerTitle, name } = formData;

  const handleChange = onChange(setFormData);
  const canSubmit = [workerTitle, name].every(Boolean) && !isUpdateLoading;
  let content;

  // Re-render for data
  useEffect(() => {
    if (worker) {
      setFormData({
        workerTitle: worker.title,
        name: worker.name,
      });
    }
  }, [worker]);

  // Handle update
  const onSubmit = async (e) => {
    e.preventDefault();
    if (canSubmit) {
      try {
        const updatedData = { workerTitle, name };
        await updateWorker({ updatedData, id: workerId }).unwrap();
        navigate("/assets");
        toast.success("Worker updated");
        refetch();
      } catch (err) {
        toast.error(err.data);
      }
    } else {
      toast.error("Check inputs");
    }
  };

  if (isLoading) {
    content = <SignInBadge />;
  } else if (isSuccess) {
    content = (
      <MemoizedWorkerForm
        onChange={handleChange}
        onSubmit={onSubmit}
        inputProps={{ workerTitle, name }}
      />
    );
  } else if (isError) {
    content = (
      <p className="mt-96 w-full text-gray-700 z-20 absolute text-center">
        {error.data}
      </p>
    );
  }

  return user ? (
    <div className="mt-44 flex justify-center items-center">{content}</div>
  ) : (
    <Navigate to="/" />
  );
};

export default EditWorker;
