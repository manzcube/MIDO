import User from "../models/userSchema.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// JWT token generation func
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    newUser
      .validate()
      .then(async () => {
        const { name, email, password, confirm_password } = req.body;
        // Check fields
        if (password !== confirm_password)
          throw new Error(`Passwords don't match`);
        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({
          name,
          email,
          password: hashed_password,
        });

        // If the user was successfully created
        if (user) {
          res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
          });
        } else {
          throw new Error("User cannot be created");
        }
      })
      .catch((err) => res.status(400).json(err.message));
  } catch (err) {
    res.status(400).json(err.message);
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) throw new Error("Add an email");
    if (!password) throw new Error("Add a password");

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) throw new Error("The user doesn't exist");
    const check_password = await bcrypt.compare(password, user.password);
    if (!check_password) throw new Error("wrong password");
    if (user && check_password) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

// Get current user
export const getMe = async (req, res) => {
  const { _id, name, email } = req.user;
  res.status(201).json({
    id: _id,
    name,
    email,
  });
};
