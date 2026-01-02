import express from "express";
import {
  getForex,
  createForex,
  updateForex,
  deleteForex,
} from "../controllers/forexController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

// GET /api/forex
router.get("/", getForex);

// POST /api/forex
router.post("/", authenticateAdmin, createForex);

// PUT /api/forex/:id
router.put("/:id", authenticateAdmin, updateForex);

// DELETE /api/forex/:id
router.delete("/:id", authenticateAdmin, deleteForex);

export default router;
