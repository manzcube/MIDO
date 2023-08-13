import { Schema, model } from "mongoose";

const bookingsSchema = Schema(
  {
    date: {
      type: String,
      required: true,
    },
    bookings_list: [
      {
        number_of_people: Number,
        activityName: String,
        start_at: String,
        bookingURL: String,
        values: Array,
      },
    ],
  },
  { timestampsh: true, toJSON: { virtuals: true } }
);

export default model("bookings", bookingsSchema);
