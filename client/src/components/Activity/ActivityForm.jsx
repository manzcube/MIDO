import React from "react";

// Components
import Button from "../Root/Button";
import Input from "../Root/Input";

const ActivityForm = ({ onChange, onSubmit, inputProps }) => {
  return (
    <form className="flex flex-col gap-2 py-2 max-w-sm">
      <Input
        type="text"
        value={inputProps.title}
        label="Title"
        onChange={onChange}
        placeholder="Title"
        name="title"
      />
      <label htmlFor="color" className="text-xs text-gray-100">
        Color
      </label>
      <select
        className="input"
        placeholder="Color"
        name="color"
        id="color"
        value={inputProps.color}
        onChange={onChange}
      >
        <option className="text-gray-800" value="bg-sky-200">
          blue
        </option>
        <option className="text-gray-800" value="bg-purple-200">
          purple
        </option>
        <option className="text-gray-800" value="bg-green-200">
          green
        </option>
        <option className="text-gray-800" value="bg-yellow-200">
          yellow
        </option>
        <option className="text-gray-800" value="bg-red-200">
          red
        </option>
        <option className="text-gray-800" value="bg-orange-200">
          orange
        </option>
      </select>
      <Button onSubmit={onSubmit}>Save Activity</Button>
    </form>
  );
};

export default ActivityForm;
