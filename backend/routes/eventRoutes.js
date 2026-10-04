const express = require("express");
const mongoose = require("mongoose");
const Event = require("../models/Event");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { venue } = req.query;
    const filter = {};

    if (venue && venue.trim() !== "") {
      filter.venue = { $regex: new RegExp(venue.trim(), "i") };
    }

    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching events",
      error: error.message
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid event ID format"
      });
    }

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching event",
      error: error.message
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, date, venue } = req.body;

    if (!title || !description || !date || !venue) {
      return res.status(400).json({
        message: "title, description, date, and venue are required"
      });
    }

    const event = await Event.create({
      title: title.trim(),
      description: description.trim(),
      date: new Date(date),
      venue: venue.trim()
    });

    res.status(201).json({
      message: "Event created successfully",
      event
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating event",
      error: error.message
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid event ID format"
      });
    }

    const updateData = { ...req.body };
    if (updateData.date) {
      updateData.date = new Date(updateData.date);
    }

    const event = await Event.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.json({
      message: "Event updated successfully",
      event
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating event",
      error: error.message
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid event ID format"
      });
    }

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.json({
      message: "Event deleted successfully",
      event
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting event",
      error: error.message
    });
  }
});

module.exports = router;
