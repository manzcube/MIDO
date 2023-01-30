import { Router } from "express";
import {
  getBookings,
  setBooking,
  updateBooking,
  deleteBooking,
  getOneBooking,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();

router.route("/").get(protect, getBookings).post(protect, setBooking);
router
  .route("/:id")
  .get(protect, getOneBooking)
  .put(protect, updateBooking)
  .delete(protect, deleteBooking);

export default router;
