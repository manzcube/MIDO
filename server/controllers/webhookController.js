import Bookings from "../models/bookingSchema.js";

export const saveBooking = async (req, res) => {
  try {
    const bookingData = req.body;
    const dashboardUrl = bookingData.booking.dashboard_url;
    const newDate = new Date(bookingData.booking.availability.start_at);
    const start_at = newDate.getHours();
    const extractedDate = newDate.toISOString().split("T")[0];
    const activityName =
      bookingData.booking.customers[0].customer_type_rate.customer_type.singular.split(
        " "
      )[0];
    const values = bookingData.booking.custom_field_values.map((each) => [
      each.name,
      each.display_value,
    ]);

    // New Input
    const newData = {
      number_of_people: bookingData.booking.customer_count,
      activityName,
      start_at,
      bookingURL: dashboardUrl,
      values,
    };

    // Check if is the first booking of the day
    const bookingExists = await Bookings.findOne({ date: extractedDate });
    if (bookingExists) {
      // There are some bookings today
      // Push new booking
      const updatedBooking = await Bookings.findByIdAndUpdate(
        bookingExists._id,
        { $push: { bookings_list: newData } },
        { new: true }
      );

      // If cannot pus new booking
      if (!updatedBooking)
        res.status(400).json(`Could not save new booking, ${dashboardUrl}`);
      res.status(200).json("Bookings Created and Saved successfully!");
    } else {
      // If no bookings yet
      const createNewBooking = await Bookings.create({
        date: extractedDate,
        bookings_list: [newData],
      });
      // If cannot create first booking of the day
      if (!createNewBooking) res.status(400).json("Could not create Booking");
      res.status(200).json("Bookings Created and Saved successfully!");
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

export const getBookings = async (req, res) => {
  try {
    const oneBookingsDay = await Bookings.findOne({ date: req.params.id });
    if (oneBookingsDay) {
      return res.status(200).json(oneBookingsDay);
    } else {
      const data = await Bookings.create({
        date: req.params.id,
      });
      return res.status(200).json(data);
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

export const health = async (req, res) => {
  res.status(200).json("The endpoint is healthy");
};
