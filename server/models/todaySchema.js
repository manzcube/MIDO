import { Schema, model } from "mongoose";

const todaySchema = Schema(
  {
    date: {
      type: String,
      required: true,
    },
    activities: [
      {
        title: String,
        color: String,
        boat: String,
        comments: String,
        schedule: String,
        workers: [
          {
            name: String,
            title: String,
          },
        ],
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default model("today", todaySchema);
