import { Router } from "express";
import {
  getActivities,
  setActivity,
  updateActivity,
  deleteActivity,
  getOneActivity,
} from "../controllers/activityController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();

router.route("/").get(protect, getActivities).post(protect, setActivity);
router
  .route("/:id")
  .get(protect, getOneActivity)
  .put(protect, updateActivity)
  .delete(protect, deleteActivity);

export default router;
