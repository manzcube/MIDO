import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

export const protect = async (req, res, next) => {
  let token;

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
      throw new Error("There is no authorization");
    }
  } catch (err) {
    res.status(401).json(err.message);
  }
};
