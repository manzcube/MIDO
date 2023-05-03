import Worker from "../models/workerSchema.js";

export const getOneWorker = async (req, res) => {
  try {
    const oneWorker = await Worker.findById(req.params.id);
    res.status(200).json(oneWorker);
  } catch (err) {
    res.status(400).json("Worker not found");
  }
};

export const getWorkers = async (req, res) => {
  try {
    const data = await Worker.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json("Cannot get Activities");
  }
};

export const setWorker = async (req, res) => {
  try {
    const newWorker = new Worker(req.body);
    newWorker
      .validate()
      .then(async () => {
        const data = await Worker.create({
          name: req.body.name,
          title: req.body.title,
        });
        res.status(200).json(`Worker ${data.name} created`);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const updateWorker = async (req, res) => {
  try {
    const data = await Worker.findById(req.params.id);
    if (!data) {
      throw new Error("Worker not found");
    } else {
      const updatedWorker = await Worker.findByIdAndUpdate(
        data.id,
        {
          name: req.body.name,
          title: req.body.title,
        },
        { new: true }
      );
      res.status(200).json({
        message: "Worker updated!",
        result: updatedWorker,
      });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const deleteWorker = async (req, res) => {
  try {
    const data = await Worker.findById(req.params.id);
    if (!data) {
      throw new Error("The Worker you wanna delete doesn't exist");
    } else {
      await Worker.findByIdAndDelete(req.params.id);
      res.status(200).json("Worker deleted");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};
