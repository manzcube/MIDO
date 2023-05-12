import { Router } from "express";
import { saveBooking, health } from "../controllers/webhookController.js";
const router = Router();

router.route("/").get(health).post(saveBooking);

export default router;
