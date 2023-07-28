import { Schema, model } from "mongoose";

const workerSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default model("worker", workerSchema);
