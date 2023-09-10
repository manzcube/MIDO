import React from "react";

// Components
import Button from "../Root/Button";

const ActivityForm = ({ onChange, onSubmit, inputProps }) => {
  return (
    <form className="flex flex-col gap-2 py-2 max-w-sm">
      <label htmlFor="color" className="text-xs text-gray-700">
        Title
      </label>
      <input
        type="text"
        value={inputProps.title}
        onChange={onChange}
        placeholder="Title"
        name="title"
        className="p-1 outline-none border rounded text-xs"
      />
      <label htmlFor="color" className="text-xs text-gray-700">
        Color
      </label>
      <select
        className="p-1 outline-none border rounded text-xs"
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
