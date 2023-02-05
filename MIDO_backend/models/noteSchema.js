import { Schema, model } from "mongoose";

const noteSchema = Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default model("note", noteSchema);
