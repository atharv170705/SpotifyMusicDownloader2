import { Router } from "express";
import { getSong } from "../controllers/songController.js";

const router = Router();

router.route("/fetch-song").post(getSong);

export default router;