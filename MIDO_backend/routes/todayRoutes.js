import { Router } from "express";
import {
  getToday,
  setToday,
  updateToday,
  deleteToday,
} from "../controllers/todayController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();

router.route("/").post(protect, setToday);
router.route("/one/:date").get(protect, getToday);
router.route("/:id").put(protect, updateToday).delete(protect, deleteToday);

export default router;
