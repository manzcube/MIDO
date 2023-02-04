import Today from "../models/todaySchema.js";
import Activity from "../models/activitySchema.js";

export const getToday = async (req, res) => {
  try {
    const oneDay = await Today.findOne({ date: req.params.date });
    if (oneDay) {
      res.status(200).json(oneDay);
    } else {
      const newToday = await Today.create({
        date: req.params.date,
        activities: [],
      });
      if (newToday) {
        console.log(newToday);
        res.status(200).json(newToday);
      } else {
        throw new Error("there is no new today");
      }
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

export const setToday = async (req, res) => {
  try {
    const todayExists = await Today.findOne({ date: req.body.date });
    if (todayExists) {
      res.status(200).json({ message: "Day already exists" });
    } else {
      const newToday = new Today(req.body);
      newToday
        .validate()
        .then(async () => {
          const data = await Today.create({
            date: req.body.date,
            activities: req.body.activities,
          });
          res.status(200).json(`Day ${data.date} created`);
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const updateToday = async (req, res) => {
  try {
    const { type, newEntry } = req.body;

    if (type === "activity") {
      const { color, title, duration, workers } = newEntry;
      await Today.findByIdAndUpdate(
        req.params.id,
        {
          $push: { activities: { color, title, duration, workers: [] } },
        },
        { new: true }
      )
        .then((result) => {
          res.status(200).json({
            message: "Day updated!",
          });
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } else if (type === "worker") {
      console.log("type worker read");
      const { name, title, picture } = newEntry;
      console.log(name, title, picture);
      await Today.findByIdAndUpdate(
        req.params.id,
        {
          $push: { "activities.$[activity].workers": { name, title, picture } },
        },
        { arrayFilters: [{ "activity._id": req.body.activityId }], new: true }
      )
        .then((result) => {
          res.status(200).json({
            message: "Day updated!",
            result,
          });
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    }
  } catch (err) {
    console.log(err.message);
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
