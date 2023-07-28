import { Router } from "express";
import {
  getWorkers,
  setWorker,
  updateWorker,
  deleteWorker,
  getOneWorker,
} from "../controllers/workerController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();

router.route("/").get(protect, getWorkers).post(protect, setWorker);
router
  .route("/:id")
  .get(protect, getOneWorker)
  .put(protect, updateWorker)
  .delete(protect, deleteWorker);

export default router;
