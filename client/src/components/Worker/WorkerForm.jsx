import React from "react";

// Components
import Button from "../Root/Button";
import Input from "../Root/Input";

const WorkerForm = ({ onChange, onSubmit, inputProps }) => {
  console.log(inputProps);
  return (
    <>
      <form className="flex flex-col border shadow-xl rounded-md py-5 px-8 max-w-sm">
        <input
          type="text"
          value={inputProps.name}
          onChange={onChange}
          placeholder="Name"
          name="name"
          className="p-1 outline-none border rounded text-xs"
        />
        <input
          type="text"
          value={inputProps.workerTitle}
          className="p-1 outline-none border rounded text-xs"
          onChange={onChange}
          placeholder="Title"
          name="workerTitle"
        />
        <Button onSubmit={onSubmit}>Save Worker</Button>
      </form>
    </>
  );
};

export default WorkerForm;
