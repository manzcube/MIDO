import React from "react";

// Components
import Button from "../Root/Button";
import Input from "../Root/Input";

const WorkerForm = ({ onChange, onSubmit, inputProps }) => {
  return (
    <form className="flex flex-col gap-2 py-2 max-w-sm">
      <Input
        title="Name"
        type="text"
        value={inputProps.name}
        onChange={onChange}
        placeholder="Name"
        name="name"
        className="p-1 outline-none border border-2 rounded text-xs"
      />

      <Input
        title="Title"
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
