import Today from "../models/todaySchema.js";

export const getToday = async (req, res) => {
  try {
    const oneDay = await Today.findById(req.params.id);
    res.status(200).json(oneDay);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

export const getAllDays = async (req, res) => {
  try {
    const data = await Today.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

export const setToday = async (req, res) => {
  try {
    const newToday = new Today(req.body);
    newToday
      .validate()
      .then(async () => {
        const data = await Today.create({
          date: req.body.date,
        });
        res.status(200).json(`Day ${data.date} created`);
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

export const updateToday = async (req, res) => {
  try {
    const data = await Today.findById(req.params.id);
    if (!data) {
      res.status(400);
      throw new Error("Day not found");
    } else {
      const updatedToday = await Today.findByIdAndUpdate(
        req.params.id,
        {
          date: req.body.date,
        },
        { new: true }
      );
      res.status(200).json({
        message: "Today updated!",
        result: updatedToday,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteToday = async (req, res) => {
  try {
    const data = await Today.findById(req.params.id);
    if (!data) {
      res.status(400);
      throw new Error("The Day you wanna delete doesn't exist");
    } else {
      await Today.findByIdAndDelete(req.params.id);
      res.status(200).json("Today deleted");
    }
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};
