import React from "react";

// Components
import Button from "../Root/Button";
import Input from "../Root/Input";

const ActivityForm = ({ onChange, onSubmit, inputProps }) => {
  return (
    <form className="flex flex-col items-center gap-2 py-2 w-sm">
      <Input
        type="text"
        value={inputProps.title}
        label="Title"
        onChange={onChange}
        placeholder="Title"
        name="title"
      />
      <div className="input-pack gap-2">
        <label htmlFor="color" className="text-xs text-start text-gray-700">
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
      </div>
      <Button onSubmit={onSubmit}>Save Activity</Button>
    </form>
  );
};

export default ActivityForm;
