// ===============================================================
// Mongoose Model: Note
// Defines the schema structure and validations for student notes
// ===============================================================

const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Note title is required"],
      trim: true
    },
    content: {
      type: String,
      required: [true, "Note content is required"],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
