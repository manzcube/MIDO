import Worker from "../models/workerSchema.js";

export const getOneWorker = async (req, res) => {
  try {
    const oneWorker = await Worker.findById(req.params.id);
    res.status(200).json(oneWorker);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

export const getWorkers = async (req, res) => {
  try {
    const data = await Worker.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

export const setWorker = async (req, res) => {
  try {
    console.log(req);
    const newWorker = new Worker(req.body);
    newWorker
      .validate()
      .then(async () => {
        const data = await Worker.create({
          name: req.body.name,
          address: req.body.address,
          age: req.body.age,
        });
        res.status(200).json(`Worker ${data.name} created`);
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

export const updateWorker = async (req, res) => {
  try {
    const data = await Worker.findById(req.params.id);
    if (!data) {
      res.status(400);
      throw new Error("Worker not found");
    } else {
      const updatedWorker = await Worker.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          address: req.body.address,
          age: req.body.age,
        },
        { new: true }
      );
      res.status(200).json({
        message: "Worker updated!",
        result: updatedWorker,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteWorker = async (req, res) => {
  try {
    const data = await Worker.findById(req.params.id);
    if (!data) {
      res.status(400);
      throw new Error("The Worker you wanna delete doesn't exist");
    } else {
      await Worker.findByIdAndDelete(req.params.id);
      res.status(200).json("Worker deleted");
    }
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};
