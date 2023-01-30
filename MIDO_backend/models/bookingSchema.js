import { Schema, model } from "mongoose";

const bookingSchema = Schema(
  {
    activity: {
      type: Schema.Types.ObjectId,
      ref: "Activity",
      required: true,
    },
    people: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    pickup: {
      type: Boolean,
      required: true,
    },
    hotel: {
      type: String,
    },
    comments: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default model("booking", bookingSchema);
