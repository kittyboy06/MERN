const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const eventRoutes = require("./routes/eventRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/campushub";

app.use(cors());
app.use(express.json());
app.use(logger);

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

app.use("/api/students", studentRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/notes", noteRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

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
    process.exit(1);
  });
