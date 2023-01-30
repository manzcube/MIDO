import { Router } from "express";
import {
  getToday,
  getAllDays,
  setToday,
  updateToday,
  deleteToday,
} from "../controllers/todayController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();

router.route("/").get(protect, getAllDays).post(protect, setToday);
router
  .route("/:id")
  .get(protect, getToday)
  .put(protect, updateToday)
  .delete(protect, deleteToday);

export default router;
