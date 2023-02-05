import Role from "../models/roleSchema.js";

export const getRoles = async (req, res) => {
  try {
    const data = await Role.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json("Cannot get Roles");
  }
};

export const setRole = async (req, res) => {
  try {
    const newRole = new Role(req.body);
    newRole
      .validate()
      .then(async () => {
        const data = await Role.create({
          name: req.body.name,
          language: req.body.language,
        });
        res.status(200).json(`Role ${data.name} created`);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const deleteRole = async (req, res) => {
  try {
    const data = await Role.findById(req.params.id);
    if (!data) {
      throw new Error("The Role you wanna delete doesn't exist");
    } else {
      await Role.findByIdAndDelete(req.params.id);
      res.status(200).json("Role deleted");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};
