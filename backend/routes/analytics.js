import express from "express";
import {
  getTotalVisitors,
  getAverageTime,
  getActiveViewers,
  getNewViewers,
  getTrafficOverview,
  getTopLocations,
  resetAnalytics,
} from "../controllers/analyticsController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

// GET /api/analytics/total-visitors
router.get("/total-visitors", authenticateAdmin, getTotalVisitors);

// GET /api/analytics/average-time
router.get("/average-time", authenticateAdmin, getAverageTime);

// GET /api/analytics/active-viewers
router.get("/active-viewers", authenticateAdmin, getActiveViewers);

// GET /api/analytics/new-viewers
router.get("/new-viewers", authenticateAdmin, getNewViewers);

// GET /api/analytics/traffic-overview
router.get("/traffic-overview", authenticateAdmin, getTrafficOverview);

// GET /api/analytics/top-locations
router.get("/top-locations", authenticateAdmin, getTopLocations);

// POST /api/analytics/reset
router.post("/reset", authenticateAdmin, resetAnalytics);

export default router;
