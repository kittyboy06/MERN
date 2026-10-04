const express = require("express");
const mongoose = require("mongoose");
const Assignment = require("../models/Assignment");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { status, subject } = req.query;
    const filter = {};

    if (status && status.trim() !== "") {
      filter.status = status.trim();
    }

    if (subject && subject.trim() !== "") {
      filter.subject = { $regex: new RegExp(subject.trim(), "i") };
    }

    const assignments = await Assignment.find(filter).sort({ dueDate: 1 });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching assignments",
      error: error.message
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid assignment ID format"
      });
    }

    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found"
      });
    }

    res.json(assignment);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching assignment",
      error: error.message
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, subject, dueDate, status } = req.body;

    if (!title || !subject || !dueDate) {
      return res.status(400).json({
        message: "title, subject, and dueDate are required"
      });
    }

    const assignment = await Assignment.create({
      title: title.trim(),
      subject: subject.trim(),
      dueDate: new Date(dueDate),
      status: status || "Pending"
    });

    res.status(201).json({
      message: "Assignment created successfully",
      assignment
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating assignment",
      error: error.message
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid assignment ID format"
      });
    }

    const updateData = { ...req.body };
    if (updateData.dueDate) {
      updateData.dueDate = new Date(updateData.dueDate);
    }

    const assignment = await Assignment.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found"
      });
    }

    res.json({
      message: "Assignment updated successfully",
      assignment
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating assignment",
      error: error.message
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid assignment ID format"
      });
    }

    const assignment = await Assignment.findByIdAndDelete(id);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found"
      });
    }

    res.json({
      message: "Assignment deleted successfully",
      assignment
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting assignment",
      error: error.message
    });
  }
});

module.exports = router;
