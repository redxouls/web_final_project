const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const FollowingSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username field is required."],
  },
  serial_number: {
    type: String,
    required: [true, "Password field is required."],
  },
});
// Creating a table within database with the defined schema
const Following = mongoose.model("following", FollowingSchema);

// Exporting table for querying and mutating
module.exports = Following;
