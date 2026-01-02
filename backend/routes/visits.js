import express from "express";
import { trackVisit } from "../controllers/visitsController.js";

const router = express.Router();

// POST /api/visits
router.post("/", trackVisit);

export default router;
