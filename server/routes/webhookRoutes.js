import { Router } from "express";
import {
  saveBooking,
  health,
  getBookings,
} from "../controllers/webhookController.js";
import { protect } from "../middleware/authMiddleware.js"
const router = Router();

router.route("/").post(saveBooking);
router.route("/health").get(health);
router.route("/:id").get(protect, getBookings)

export default router;
