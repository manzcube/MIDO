import { Router } from "express";
import {
  getRoles,
  setRole,
  updateRole,
  deleteRole,
  getOneRole,
} from "../controllers/roleController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();

router.route("/").get(protect, getRoles).post(protect, setRole);
router
  .route("/:id")
  .get(protect, getOneRole)
  .put(protect, updateRole)
  .delete(protect, deleteRole);

export default router;
