import { Schema, model } from "mongoose";

const logSchema = Schema(
  {
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default model("log", logSchema);
