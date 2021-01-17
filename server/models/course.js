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
    required: [true, "Department field is required."],
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
    required: [true, "FullHalf field is required."],
  },
  required: {
    type: String,
    required: [true, "Required field is required."],
  },
  teacher: {
    type: String,
    required: [true, "Teacher field is required."],
  },
  rule: {
    type: String,
    required: [true, "Rule field is required."],
  },
  location_time: {
    type: String,
    required: [true, "Location field is required."],
  },
  stu_limit: {
    type: String,
    required: [true, "Stu_limit field is required."],
  },
  limit: {
    type: String,
    required: [true, "Limit field is required."],
  },
  note: {
    type: String,
    required: [true, "Note field is required."],
  },
});
// Creating a table within database with the defined schema
const Course = mongoose.model("course", CourseSchema);

// Exporting table for querying and mutating
module.exports = Course;
