import Booking from "../models/bookingSchema.js";

export const getOneBooking = async (req, res) => {
  try {
    const oneBooking = await Booking.findById(req.params.id);
    res.status(200).json(oneBooking);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

export const getBookings = async (req, res) => {
  try {
    const data = await Booking.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

export const setBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    newBooking
      .validate()
      .then(async () => {
        const data = await Booking.create(req.body);
        res.status(200).json(`Booking ${data.name} created`);
      })
      .catch((err) => {
        res.status(400);
        throw new Error(err.message);
      });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

export const updateBooking = async (req, res) => {
  try {
    const data = await Booking.findById(req.params.id);
    if (!data) {
      res.status(400);
      throw new Error("Booking not found");
    } else {
      const updatedBooking = await Booking.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json({
        message: "Booking updated!",
        result: updatedBooking,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const data = await Booking.findById(req.params.id);
    if (!data) {
      res.status(400);
      throw new Error("The Booking you wanna delete doesn't exist");
    } else {
      await Booking.findByIdAndDelete(req.params.id);
      res.status(200).json("Booking deleted");
    }
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};
