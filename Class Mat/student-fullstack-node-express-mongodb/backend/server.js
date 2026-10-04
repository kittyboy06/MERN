const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const studentRoutes = require("./routes/studentRoutes");
const logger = require("./middleware/logger");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/studentDB";

// ===============================
// MIDDLEWARE
// ===============================

// Allows React frontend to call this backend.
app.use(cors());

// Converts JSON request bodies into req.body.
app.use(express.json());

// Custom middleware: logs every request.
app.use(logger);

// ===============================
// BASIC ROUTE
// ===============================

app.get("/", (req, res) => {
  res.json({
    message: "Student API is running",
    port: PORT,
    endpoints: {
      students: "/api/students"
    }
  });
});

// ===============================
// STUDENT ROUTES
// ===============================

app.use("/api/students", studentRoutes);

// ===============================
// 404 HANDLER
// ===============================

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

// ===============================
// MONGODB CONNECTION + SERVER
// ===============================

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
