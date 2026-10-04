const express = require("express");
const mongoose = require("mongoose");
const Student = require("../models/Student");

const router = express.Router();

// =====================================================
// GET /api/students
// Query parameters:
// /api/students?department=AIML
// /api/students?department=AIML&year=3
// =====================================================

router.get("/", async (req, res) => {
  try {
    const { department, year } = req.query;

    const filter = {};

    if (department) {
      filter.department = department;
    }

    if (year) {
      filter.year = Number(year);
    }

    const students = await Student.find(filter).sort({ createdAt: -1 });

    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching students",
      error: error.message
    });
  }
});

// =====================================================
// GET /api/students/:id
// Route parameter:
// /api/students/64abc123...
// =====================================================

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid student ID"
      });
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching student",
      error: error.message
    });
  }
});

// =====================================================
// POST /api/students
// Request body:
// {
//   "name": "Arun",
//   "department": "AIML",
//   "year": 3
// }
// =====================================================

router.post("/", async (req, res) => {
  try {
    const { name, department, year } = req.body;

    if (!name || !department || !year) {
      return res.status(400).json({
        message: "name, department and year are required"
      });
    }

    const student = await Student.create({
      name,
      department,
      year
    });

    res.status(201).json({
      message: "Student added successfully",
      student
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding student",
      error: error.message
    });
  }
});

// =====================================================
// PUT /api/students/:id
// =====================================================

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid student ID"
      });
    }

    const student = await Student.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.json({
      message: "Student updated successfully",
      student
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating student",
      error: error.message
    });
  }
});

// =====================================================
// DELETE /api/students/:id
// =====================================================

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid student ID"
      });
    }

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.json({
      message: "Student deleted successfully",
      student
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting student",
      error: error.message
    });
  }
});

module.exports = router;
