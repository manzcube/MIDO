import React from "react";

// Components
import Input from "../Root/Input";
import Button from "../Root/Button";

const ActivityForm = ({ onChange, onSubmit, inputProps }) => {
  return (
    <form className="flex flex-col border shadow-xl rounded py-5 px-8 max-w-sm">
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
        className="p-1 px-3 mb-3 bg-gray-50 text-sm text-gray-700 border border-gray-300 rounded-md leading-tight focus:bg-gray-100 focus:outline-none"
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
