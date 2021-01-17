const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const CourseVoteSchema = new Schema({
  serial_number: {
    type: String,
    required: [true, "Username field is required."],
  },
  question: {
    type: String,
    required: [true, "Question field is required."],
  },
  option: {
    type: String,
    required: [true, "Option field is required."],
  },
  count: {
    type: Number,
    required: [true, "Count field is required."],
  },
});
// Creating a table within database with the defined schema
const CourseVote = mongoose.model("courseVote", CourseVoteSchema);

// Exporting table for querying and mutating
module.exports = CourseVote;
