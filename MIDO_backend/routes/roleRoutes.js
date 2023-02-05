import { Router } from "express";
import {
  getRoles,
  setRole,
  deleteRole,
} from "../controllers/roleController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();

router.route("/").get(protect, getRoles).post(protect, setRole);
router.route("/:id").delete(protect, deleteRole);

export default router;
