import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

// GET /api/profile
router.get("/", getProfile);

// PUT /api/admin/profile
router.put("/admin", authenticateAdmin, updateProfile);

export default router;
