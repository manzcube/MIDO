import { Schema, model } from "mongoose";

const roleSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default model("role", roleSchema);
