import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

export const protect = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // Get the token from the header
        const token = req.headers.authorization.split(" ")[1];
        // Verify the token
        const decoded = jwt.decode(token, process.env.JWT_SECRET);
        if (!decoded) throw new Error("there is no token");
        // Set the request user
        req.user = await User.findById(decoded.id).select("-password");
        next();
      } catch (err) {
        throw new Error("You're not authorized");
      }
    } else {
      throw new Error("You're not authorized");
    }
  } catch (err) {
    res.status(401).json(err.message);
  }
};

export const checkForSignUp = (req, res, next) => {
  console.log(req.body);
  try {
    if (req.body.signupsecret === process.env.SIGN_UP) {
      next();
    } else {
      throw new Error("You cannot register a user");
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};
