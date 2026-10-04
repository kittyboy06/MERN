const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    department: {
      type: String,
      required: true,
      trim: true
    },

    year: {
      type: Number,
      required: true,
      min: 1,
      max: 6
    }
  },
  {
    timestamps: true
  }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
