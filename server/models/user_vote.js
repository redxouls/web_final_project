const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const UserVoteSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username field is required."],
  },
  serial_number: {
    type: String,
    required: [true, "Password field is required."],
  },
  question: {
    type: String,
    required: [true, "Question field is required."],
  },
  option: {
    type: String,
    required: [true, "Option field is required."],
  },
  time: {
    type: String,
    required: [true, "Time field is required."],
  },
});
// Creating a table within database with the defined schema
const UserVote = mongoose.model("userVote", UserVoteSchema);

// Exporting table for querying and mutating
module.exports = UserVote;
