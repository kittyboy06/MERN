// ===============================================================
// Student Routes: /api/students
// Demonstrates REST API CRUD operations using Express Router
// and Mongoose methods with query parameters and route parameters.
// ===============================================================

const express = require("express");
const mongoose = require("mongoose");
const Student = require("../models/Student");

const router = express.Router();

// ===============================================================
// GET /api/students
// Demonstrates: Reading collection & filtering via req.query
// Example query: /api/students?department=AIML&year=2
// ===============================================================
router.get("/", async (req, res) => {
  try {
    // req.query extracts URL parameters following the '?' symbol
    const { department, year } = req.query;

    const filter = {};

    if (department && department.trim() !== "") {
      // Case-insensitive partial or exact matching
      filter.department = { $regex: new RegExp(department.trim(), "i") };
    }

    if (year) {
      filter.year = Number(year);
    }

    // Model.find() retrieves documents matching the filter object
    const students = await Student.find(filter).sort({ createdAt: -1 });

    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching students",
      error: error.message
    });
  }
});

// ===============================================================
// GET /api/students/:id
// Demonstrates: Route parameter (req.params) and single document lookup
// Example: /api/students/64abc123...
// ===============================================================
router.get("/:id", async (req, res) => {
  try {
    // req.params contains route variables declared with a colon (:)
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid student ID format"
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

// ===============================================================
// POST /api/students
// Demonstrates: Creating a new document using data from req.body
// ===============================================================
router.post("/", async (req, res) => {
  try {
    // req.body contains JSON parsed by express.json() middleware
    const { name, department, year } = req.body;

    if (!name || !department || !year) {
      return res.status(400).json({
        message: "name, department, and year are required"
      });
    }

    // Model.create() instantiates and saves a new document in one step
    const student = await Student.create({
      name: name.trim(),
      department: department.trim(),
      year: Number(year)
    });

    // 201 Created status indicates successful resource creation
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

// ===============================================================
// PUT /api/students/:id
// Demonstrates: Updating an existing document by ID using req.body
// ===============================================================
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid student ID format"
      });
    }

    // Model.findByIdAndUpdate() modifies the document.
    // { new: true } returns the updated document instead of the old one.
    // { runValidators: true } enforces schema rules during updates.
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

// ===============================================================
// DELETE /api/students/:id
// Demonstrates: Removing a document from the database
// ===============================================================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid student ID format"
      });
    }

    // Model.findByIdAndDelete() removes the document matching the ID
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
