const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const CommentSchema = new Schema({
  serial_number: {
    type: String,
    required: [true, "Serial_number field is required."],
  },
  username: {
    type: String,
    required: [true, "Username field is required."],
  },
  body: {
    type: String,
    required: [true, "Body field is required."],
  },
  like: {
    type: Number,
    required: [true, "Like field is required."],
  },
  unlike: {
    type: Number,
    required: [true, "Unlike field is required."],
  },
});
// Creating a table within database with the defined schema
const Comment = mongoose.model("comment", CommentSchema);

// Exporting table for querying and mutating
module.exports = Comment;
