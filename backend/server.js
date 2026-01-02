import dotenv from "dotenv";
dotenv.config();

// NOW import everything else
import express from "express";
import cors from "cors";
import connectDB from "./lib/mongodb.js";

// Routes
import contactRoutes from "./routes/contact.js";
import adminRoutes from "./routes/admin.js";
import projectsRoutes from "./routes/projects.js";
import testimonialsRoutes from "./routes/testimonials.js";
import profileRoutes from "./routes/profile.js";
import visitsRoutes from "./routes/visits.js";
import forexRoutes from "./routes/forex.js";
import analyticsRoutes from "./routes/analytics.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database (now env vars are loaded)
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000", // fallback for safety
    credentials: false,
  })
);
app.use(express.json());

// Serve static files from uploads directory
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/visits", visitsRoutes);
app.use("/api/forex", forexRoutes);
app.use("/api/analytics", analyticsRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
