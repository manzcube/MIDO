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
        duration: String,
        color: String,
        workers: [
          {
            name: String,
            title: String,
            picture: String,
            roles: [],
          },
        ],
        comments: String,
        schedule: String,
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default model("today", todaySchema);
