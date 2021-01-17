const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const CourseSchema = new Schema({
  serial_number: {
    type: String,
    required: [true, "Serial_number field is required."],
  },
  department: {
    type: String,
    required: [false, "Department field is required."],
  },
  number: {
    type: String,
    required: [true, "Number field is required."],
  },
  class: {
    type: String,
    required: [true, "Class field is required."],
  },
  title: {
    type: String,
    required: [true, "Title field is required."],
  },
  credits: {
    type: String,
    required: [true, "Credit field is required."],
  },
  id: {
    type: String,
    required: [true, "Id field is required."],
  },
  full_half: {
    type: String,
    required: [false, "FullHalf field is required."],
  },
  required: {
    type: String,
    required: [false, "Required field is required."],
  },
  teacher: {
    type: String,
    required: [false, "Teacher field is required."],
  },
  rule: {
    type: String,
    required: [false, "Rule field is required."],
  },
  stu_limit: {
    type: String,
    required: [false, "Stu_limit field is required."],
  },
  limit: {
    type: String,
    required: [false, "Limit field is required."],
  },
  note: {
    type: String,
    required: [false, "Note field is required."],
  },
  location: {
    type: String,
    required: [false, "location field is required."],
  },
  time: {
    type: String,
    required: [false, "Time field is required."],
  },
});
// Creating a table within database with the defined schema
const Course = mongoose.model("course", CourseSchema);

// Exporting table for querying and mutating
module.exports = Course;
