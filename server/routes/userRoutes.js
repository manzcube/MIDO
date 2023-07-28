import { Router } from "express";
import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/userController.js";
import { checkForSignUp, protect } from "../middleware/authMiddleware.js";
const router = Router();

router.route("/register").post(checkForSignUp, registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

export default router;
