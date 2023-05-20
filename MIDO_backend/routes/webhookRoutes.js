import { Router } from "express";
import {
  saveBooking,
  health,
  getBookings,
} from "../controllers/webhookController.js";
const router = Router();

router.route("/").get(getBookings).post(saveBooking);
router.route("/health").get(health);

export default router;
