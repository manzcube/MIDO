import { Schema, model } from "mongoose";

const activitySchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  { timestampsh: true, toJSON: { virtuals: true } }
);

export default model("activity", activitySchema);
