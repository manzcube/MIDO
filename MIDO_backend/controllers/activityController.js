import Activity from "../models/activitySchema.js";

export const getOneActivity = async (req, res) => {
  try {
    const oneActivity = await Activity.findById(req.params.id);
    res.status(200).json(oneActivity);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

export const getActivities = async (req, res) => {
  try {
    const data = await Activity.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

export const setActivity = async (req, res) => {
  try {
    const newActivity = new Activity(req.body);
    newActivity
      .validate()
      .then(async () => {
        const data = await Activity.create({
          title: req.body.title,
          duration: req.body.duration,
          price: req.body.price,
        });
        res.status(200).json(`Activity ${data.name} created`);
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

export const updateActivity = async (req, res) => {
  try {
    const data = await Activity.findById(req.params.id);
    if (!data) {
      res.status(400);
      throw new Error("Activity not found");
    } else {
      const updatedActivity = await Activity.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          duration: req.body.duration,
          price: req.body.price,
        },
        { new: true }
      );
      res.status(200).json({
        message: "Activity updated!",
        result: updatedActivity,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteActivity = async (req, res) => {
  try {
    const data = await Activity.findById(req.params.id);
    if (!data) {
      res.status(400);
      throw new Error("The Activity you wanna delete doesn't exist");
    } else {
      await Activity.findByIdAndDelete(req.params.id);
      res.status(200).json("Activity deleted");
    }
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};
