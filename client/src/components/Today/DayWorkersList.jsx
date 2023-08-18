// Lib
import React, { useState } from "react";
import "./Today.css";
import { toast } from "react-toastify";

import { useCreateWorkerMutation } from "../../features/workers/workerSlice";

// Components
import SmallWorker from "../Worker/SmallWorker.jsx";

const DayWorkersList = ({ workers }) => {
  // Pieces of State
  const [creatingWorker, setCreatingWorker] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
  });
  const { title, name } = formData;

  // Mutation
  const [createWorker, { isLoading }] = useCreateWorkerMutation();
  const canSubmit = [title, name].every(Boolean) && !isLoading;

  // Sort workers
  const sortedWorkers = [...workers].sort((a, b) => {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();
    return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (canSubmit) {
      try {
        await createWorker({ title, name }).unwrap();
        setFormData({
          title: "",
          name: "",
        });
        setCreatingWorker(false);
        toast.success(`Worker created`);
      } catch (err) {
        toast.error(err.data);
      }
    } else {
      toast.error("Check inputs");
    }
  };

  let content = sortedWorkers.map((worker) => (
    <SmallWorker key={worker._id} draggable={true} worker={worker} />
  ));

  return (
    <div
      className="flex fixed top-20 z-20 w-full shadow-md bg-white overflow-x-scroll"
      id="today-workers-list"
    >
      {/* {creatingWorker ? (
        <div className="flex flex-col p-3">
          <input
            type="text"
            className="w-20 m-1 text-xs p-1 outline-none border border-gray-200 rounded"
            value={formData.name}
            onChange={onChange}
            label="Name"
            placeholder="Name"
            name="name"
          />
          <input
            type="text"
            className="w-20 m-1 text-xs p-1 outline-none border border-gray-200 rounded"
            value={formData.title}
            label="Title"
            onChange={onChange}
            placeholder="Title"
            name="title"
          />
          <button
            className="mx-auto rounded text-xs bg-gray-800 text-white px-2 py-1"
            onClick={onSubmit}
          >
            Create
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2 p-3">
          <button
            onClick={() => setCreatingWorker(true)}
            className="p-1 text-xs text-white bg-sky-700 flex items-center rounded-lg hover:text-sky-700 border border-sky-700 hover:bg-white transition-all duration-200"
          >
            Create
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
                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
          </button>
          <button
            onClick={() => setCreatingWorker(true)}
            className="p-1 text-xs text-white bg-orange-400 flex items-center rounded-lg hover:text-orange-400 border border-orange-400 hover:bg-white transition-all duration-200"
          >
            Edit
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
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
        </div>
      )} */}

      {content}
    </div>
  );
};

export default DayWorkersList;
