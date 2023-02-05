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
    const { type } = req.body;
    switch (type) {
      case "activity":
        const { color, activityTitle, duration, schedule } = req.body.newEntry;
        await Today.findByIdAndUpdate(
          req.params.id,
          {
            $push: {
              activities: {
                color,
                title: activityTitle,
                schedule,
                duration,
                workers: [],
              },
            },
          },
          { new: true }
        )
          .then((response) => res.status(200).json(response))
          .catch((err) => {
            throw new Error(err.message);
          });
        break;
      case "worker":
        const { name, title, picture } = req.body.newEntry;
        await Today.findByIdAndUpdate(
          req.params.id,
          {
            $push: {
              "activities.$[activity].workers": {
                name,
                title,
                picture,
                roles: [],
              },
            },
          },
          { arrayFilters: [{ "activity._id": req.body.activityId }], new: true }
        )
          .then((response) => res.status(200).json(response))
          .catch((err) => {
            throw new Error(err.message);
          });
        break;
      case "role":
        console.log(req.body);
        await Today.findByIdAndUpdate(
          req.params.id,
          {
            $push: {
              "activities.$[activity].workers.$[worker].roles": {
                name: req.body.newEntry.name,
                language: req.body.newEntry.language,
              },
            },
          },
          {
            arrayFilters: [
              { "activity._id": req.body.activityId },
              { "worker._id": req.body.workerId },
            ],
            new: true,
          }
        )
          .then((response) => res.status(200).json(response))
          .catch((err) => {
            throw new Error(err.message);
          });
        break;
      case "comments":
        const { comments } = req.body.newEntry;
        await Today.findByIdAndUpdate(
          req.params.id,
          {
            $set: { "activities.$[activity].comments": comments },
          },
          { arrayFilters: [{ "activity._id": req.body.activityId }], new: true }
        )
          .then((response) => res.status(200).json(response))
          .catch((err) => {
            throw new Error(err.message);
          });
        break;
      case "deleteActivity":
        const { activityId } = req.body;
        await Today.findByIdAndUpdate(
          req.params.id,
          {
            $pull: { activities: { _id: activityId } },
          },
          { new: true }
        )
          .then((response) => res.status(200).json(response))
          .catch((err) => {
            throw new Error(err.message);
          });
        break;
      default:
        console.log("something is not reading properly");
        break;
    }
  } catch (err) {
    res.status(500).json(err.message);
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
