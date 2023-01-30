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
    duration: {
      type: String,
      required: true,
    },
    languages: [
      {
        type: String,
      },
    ],
    workers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Worker",
      },
    ],
  },
  { timestampsh: true, toJSON: { virtuals: true } }
);

export default model("activity", activitySchema);
