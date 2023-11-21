// Lib
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Utils
import { default_pic } from "../../utils/utilities";

// Toast
import { toast } from "react-toastify";

// Endpoint
import { useDeleteWorkerMutation } from "../../features/workers/workerSlice";
import { Ring } from "@uiball/loaders";

const SingleWorker = ({ worker }) => {
  // State
  const [sureToDelete, setSureToDelete] = useState(false);

  // Mutation
  const [deleteWorker, { isLoading }] = useDeleteWorkerMutation();
  const canDelete = worker?._id && !isLoading;

  // Handle worker deletion
  const onDeleteWorker = async () => {
    if (canDelete) {
      try {
        await deleteWorker(worker._id).unwrap();
        toast.success("worker deleted");
      } catch (err) {
        toast.error(err.data);
      }
    } else {
      toast.error("Cannot delete worker");
    }
  };

  return (
    <div className="p-3 rounded-xl m-5 flex flex-col justify-between h-32 w-32 shadow-md bg-gray-800">
      <p className="overflow-x-hidden uppercase text-sm font-bold text-gray-100">
        {worker.name}
      </p>
      <p className="capitalize text-xs text-gray-400">{worker.title}</p>
      <div className="flex justify-between">
        {!sureToDelete ? (
          <div className="flex justify-end w-full">
            <span className="flex items-center">
              <Link to={`/workers/edit/${worker._id}`} className="mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
              </Link>
              <button onClick={() => setSureToDelete(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </span>
          </div>
        ) : (
          <div className="flex items-center">
            <button
              onClick={onDeleteWorker}
              className="py-1 px-2 rounded-md bg-red-500 text-white text-xs"
              onBlur={() => setSureToDelete(false)}
            >
              {isLoading ? (
                <Ring color="white" size={17} speed={1.5} />
              ) : (
                "Sure?"
              )}
            </button>
            <button
              className="py-1 px-2 ml-1 rounded-md bg-gray-500 text-white text-xs"
              onClick={() => setSureToDelete(false)}
            >
              cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleWorker;
