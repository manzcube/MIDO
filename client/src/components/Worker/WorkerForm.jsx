import React from "react";

// Components
import Button from "../Root/Button";
import Input from "../Root/Input";

const WorkerForm = ({ onChange, onSubmit, inputProps }) => {
  return (
    <form className="flex flex-col items-center py-2 w-xs">
      <Input
        title="Name"
        type="text"
        value={inputProps.name}
        onChange={onChange}
        placeholder="Name"
        label="Name"
        name="name"
        className="p-1 outline-none border border-2 rounded text-xs"
      />

      <Input
        title="Title"
        label="Title"
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
