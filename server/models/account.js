const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const AccountSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username field is required."],
  },
  password: {
    type: String,
    required: [true, "Password field is required."],
  },
});

// Creating a table within database with the defined schema
const Account = mongoose.model("account", AccountSchema);

// Exporting table for querying and mutating
module.exports = Account;
