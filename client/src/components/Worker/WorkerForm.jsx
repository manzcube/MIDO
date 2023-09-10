import React from "react";

// Components
import Button from "../Root/Button";

const WorkerForm = ({ onChange, onSubmit, inputProps }) => {
  return (
    <form className="flex flex-col gap-2 py-2 max-w-sm">
      <label htmlFor="color" className="text-xs text-gray-700">
        Name
      </label>
      <input
        type="text"
        value={inputProps.name}
        onChange={onChange}
        placeholder="Name"
        name="name"
        className="p-1 outline-none border border-2 rounded text-xs"
      />
      <label htmlFor="color" className="text-xs text-gray-700">
        Title
      </label>
      <input
        type="text"
        value={inputProps.workerTitle}
        className="p-1 outline-none border border-2 rounded text-xs"
        onChange={onChange}
        placeholder="Title"
        name="workerTitle"
      />
      <Button onSubmit={onSubmit}>Save Worker</Button>
    </form>
  );
};

export default WorkerForm;
