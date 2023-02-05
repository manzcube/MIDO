import { Router } from "express";
import {
  getNotes,
  setNote,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();

router.route("/").get(protect, getNotes).post(protect, setNote);
router.route("/:id").put(protect, updateNote).delete(protect, deleteNote);

export default router;
