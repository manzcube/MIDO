import { Schema, model } from "mongoose";

const todaySchema = Schema(
  {
    date: {
      type: String,
      required: true,
    },
    activities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Activity",
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default model("today", todaySchema);
