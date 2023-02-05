import { Schema, model } from "mongoose";

const activitySchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    schedule: {
      type: String,
      required: true,
    },
    workers: [
      {
        name: String,
        title: String,
        picture: String,
      },
    ],
  },
  { timestampsh: true, toJSON: { virtuals: true } }
);

export default model("activity", activitySchema);
