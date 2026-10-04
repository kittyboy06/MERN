// ===============================================================
// Mongoose Model: Event
// Defines the schema structure and validations for campus events
// ===============================================================

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true
    },
    date: {
      type: Date,
      required: [true, "Event date is required"]
    },
    venue: {
      type: String,
      required: [true, "Venue is required"],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
