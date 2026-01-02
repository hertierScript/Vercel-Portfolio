import express from "express";
import { loginAdmin, logoutAdmin } from "../controllers/adminController.js";
import {
  createProject,
  updateProject,
  deleteProject,
  getProjects,
} from "../controllers/projectController.js";
import {
  createTestimony,
  updateTestimony,
  deleteTestimony,
  getTestimonials,
} from "../controllers/testimonyController.js";
import { updateProfile } from "../controllers/profileController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

// POST /api/admin/login
router.post("/login", loginAdmin);

// POST /api/admin/logout
router.post("/logout", logoutAdmin);

// Projects management
// GET /api/admin/projects
router.get("/projects", authenticateAdmin, getProjects);

// POST /api/admin/projects
router.post("/projects", authenticateAdmin, createProject);

// PUT /api/admin/projects/:id
router.put("/projects/:id", authenticateAdmin, updateProject);

// DELETE /api/admin/projects/:id
router.delete("/projects/:id", authenticateAdmin, deleteProject);

// Testimonials management
// GET /api/admin/testimonials
router.get("/testimonials", authenticateAdmin, getTestimonials);

// POST /api/admin/testimonials
router.post("/testimonials", authenticateAdmin, createTestimony);

// PUT /api/admin/testimonials/:id
router.put("/testimonials/:id", authenticateAdmin, updateTestimony);

// DELETE /api/admin/testimonials/:id
router.delete("/testimonials/:id", authenticateAdmin, deleteTestimony);

export default router;
