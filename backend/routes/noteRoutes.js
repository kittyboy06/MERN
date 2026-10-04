// ===============================================================
// Note Routes: /api/notes
// Demonstrates REST API CRUD operations for student notes.
// ===============================================================

const express = require("express");
const mongoose = require("mongoose");
const Note = require("../models/Note");

const router = express.Router();

// ===============================================================
// GET /api/notes
// Query parameters: /api/notes?search=exam
// ===============================================================
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;

    const filter = {};

    if (search && search.trim() !== "") {
      const searchRegex = new RegExp(search.trim(), "i");
      filter.$or = [{ title: searchRegex }, { content: searchRegex }];
    }

    const notes = await Note.find(filter).sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching notes",
      error: error.message
    });
  }
});

// ===============================================================
// GET /api/notes/:id
// ===============================================================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid note ID format"
      });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching note",
      error: error.message
    });
  }
});

// ===============================================================
// POST /api/notes
// ===============================================================
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "title and content are required"
      });
    }

    const note = await Note.create({
      title: title.trim(),
      content: content.trim()
    });

    res.status(201).json({
      message: "Note created successfully",
      note
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating note",
      error: error.message
    });
  }
});

// ===============================================================
// PUT /api/notes/:id
// ===============================================================
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid note ID format"
      });
    }

    const note = await Note.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    res.json({
      message: "Note updated successfully",
      note
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating note",
      error: error.message
    });
  }
});

// ===============================================================
// DELETE /api/notes/:id
// ===============================================================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid note ID format"
      });
    }

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    res.json({
      message: "Note deleted successfully",
      note
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting note",
      error: error.message
    });
  }
});

module.exports = router;
