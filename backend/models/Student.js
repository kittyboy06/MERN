// ===============================================================
// Mongoose Model: Student
// Defines the schema structure and validations for student records
// in the MongoDB database.
// ===============================================================

const mongoose = require("mongoose");

// mongoose.Schema defines the shape of the documents inside the collection
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [1, "Year must be at least 1"],
      max: [6, "Year cannot exceed 6"]
    }
  },
  {
    // timestamps automatically adds createdAt and updatedAt fields
    timestamps: true
  }
);

// mongoose.model compiles the schema into an active model interface
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
