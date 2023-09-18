import Bookings from "../models/bookingSchema.js";
import Logs from "../models/logSchema.js";

// export const saveBooking = async (req, res) => {
//   try {
//     const bookingData = req.body;
//     const dashboardUrl = bookingData.booking.dashboard_url;
//     const newDate = new Date(bookingData.booking.availability.start_at);
//     const start_at = newDate.getHours();
//     const extractedDate = newDate.toISOString().split("T")[0];
//     const activityName =
//       bookingData.booking.customers[0].customer_type_rate.customer_type.singular.split(
//         " "
//       )[0];
//     const values = bookingData.booking.custom_field_values.map((each) => [
//       each.name,
//       each.display_value,
//     ]);

//     // New Input
//     const newData = {
//       number_of_people: bookingData.booking.customer_count,
//       activityName,
//       start_at,
//       bookingURL: dashboardUrl,
//       values,
//     };

//     // Check if is the first booking of the day
//     const bookingExists = await Bookings.findOne({ date: extractedDate });
//     if (bookingExists) {
//       // There are some bookings today
//       // Push new booking
//       const updatedBooking = await Bookings.findByIdAndUpdate(
//         bookingExists._id,
//         { $push: { bookings_list: newData } },
//         { new: true }
//       );

//       // If cannot pus new booking
//       if (!updatedBooking)
//         res.status(400).json(`Could not save new booking, ${dashboardUrl}`);
//       res.status(200).json("Bookings Created and Saved successfully!");
//       await Logs.create({
//         message: `A booking entered ${req.body.booking.uuid}`,
//       });
//     } else {
//       // If no bookings yet
//       const createNewBooking = await Bookings.create({
//         date: extractedDate,
//         bookings_list: [newData],
//       });
//       // If cannot create first booking of the day
//       if (!createNewBooking) res.status(400).json("Could not create Booking");
//       res.status(200).json("Bookings Created and Saved successfully!");
//     }
//   } catch (err) {
//     res
//       .status(400)
//       .json(
//         `Please, notify the developer with the next error message: ${err.message}`
//       );
//   }
// };

export const getBookings = async (req, res) => {
  const idFormat = /^\d{4}-\d{2}-\d{2}$/;
  if (!idFormat.test(req.params.id)) {
    return res.status(400).json("That is not a valid date format.");
  }
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

export const saveBooking = async (req, res) => {
  try {
    if (!req.body.booking) {
      await Logs.create({
        message: "There is NO booking object inside req.body",
      });
      throw new Error("there is no booking");
    }
    // If there is a booking object in req.body, grab data
    const {
      uuid,
      dashboard_url,
      status,
      availability,
      customers,
      customer_count,
      custom_field_values,
    } = req.body.booking;

    // Notify developer
    await Logs.create({
      message: `A booking entered correctly with uuid: ${uuid}, dashboard_url: ${dashboard_url} and status: ${status}`,
    });

    // Date
    const timezoneOffset = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
    const getDateInFormat = new Date(availability.start_at);
    getDateInFormat.setTime(getDateInFormat.getTime() + timezoneOffset); // Adjust by 2 hours
    const date = getDateInFormat.toISOString().split("T")[0];
    const start_at = getDateInFormat.getHours();

    // Activty
    const activity = customers[0].customer_type_rate.customer_type.singular;

    // Values of booking
    const values = custom_field_values.map((value) => [
      value.name,
      value.display_value,
    ]);

    // Create new Data Object
    const newData = {
      customer_count,
      activity,
      date,
      start_at,
      status,
      dashboard_url,
      values,
    };

    // Check if it's the first booking of that day
    const some_booking = await Bookings.findOne({ date });

    // If there is some booking in the selected day
    if (some_booking) {
      const newBooking = await Bookings.findByIdAndUpdate(
        some_booking._id,
        { $push: { bookings_list: newData } },
        { new: true }
      );

      // Return successful message
      res.status(200).json("The booking has been saved correctly");
    } else {
      // If there is no bookings yet in the selected day
      const newBooking = await Bookings.create({
        date,
        bookings_list: [newData],
      });
      res.status(200).json("The booking has been saved correctly");
    }
  } catch (err) {
    res
      .status(400)
      .json(
        `Please, notify the developer with the next error message: ${err.message}`
      );
  }
};
