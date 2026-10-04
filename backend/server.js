// ===============================================================
// CampusHub Backend: server.js
// Main entry point for the Node.js + Express backend server.
// Demonstrates Express setup, middleware pipeline, MongoDB connection,
// and modular route mounting.
// ===============================================================

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file into process.env
dotenv.config();

// Import custom middleware
const logger = require("./middleware/logger");

// Import modular route handlers
const studentRoutes = require("./routes/studentRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const eventRoutes = require("./routes/eventRoutes");
const noteRoutes = require("./routes/noteRoutes");

// Initialize Express application instance
const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/campushub";

// ===============================================================
// MIDDLEWARE PIPELINE
// Functions executed in order for every incoming HTTP request.
// ===============================================================

// 1. CORS Middleware: Allows the React frontend (running on a different port like 5173)
// to make requests to this Express backend.
app.use(cors());

// 2. Express JSON Middleware: Automatically parses incoming requests with
// JSON payloads, populating 'req.body'.
app.use(express.json());

// 3. Custom Logger Middleware: Logs HTTP method, URL, and timestamp.
app.use(logger);

// ===============================================================
// BASE HEALTH CHECK ROUTE
// ===============================================================

app.get("/", (req, res) => {
  res.json({
    message: "CampusHub API is running smoothly",
    port: PORT,
    endpoints: {
      students: "/api/students",
      assignments: "/api/assignments",
      events: "/api/events",
      notes: "/api/notes"
    }
  });
});

// ===============================================================
// MOUNT RESOURCE ROUTES
// Maps specific URL path prefixes to their dedicated router modules.
// ===============================================================

app.use("/api/students", studentRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/notes", noteRoutes);

// ===============================================================
// 404 NOT FOUND HANDLER
// Catches any requests that did not match an existing endpoint above.
// ===============================================================

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

// ===============================================================
// MONGODB CONNECTION & SERVER STARTUP
// Connect to MongoDB first; only start the server if connection succeeds.
// ===============================================================

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("==========================================");
    console.log("MongoDB connected successfully to:", MONGO_URI);
    console.log("==========================================");

    app.listen(PORT, () => {
      console.log(`CampusHub Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    console.error("Please make sure MongoDB is running locally on port 27017.");
    process.exit(1);
  });
