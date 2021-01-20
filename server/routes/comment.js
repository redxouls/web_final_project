const express = require("express");
const asyncHandler = require("express-async-handler");
const Comment = require("../models/comment");
const Following = require("../models/following");
const { updateComment } = require("../socket");
const router = express.Router();

// For fetching course infomations
router.route("/").post(
  express.urlencoded({ extended: false }),
  asyncHandler(async (req, res, next) => {
    const username = req.session.username;
    const { serial_number, body } = req.body;
    const io = req.app.get("io");

    if (!req.session.username) {
      res.status(401).send({ message: "Not authorized request" });
      return;
    }
    const response = await Following.find({ username });
    if (response.length === 0) {
      res.status(400).send({ message: "DB BAOLA" });
      return;
    }

    const following = response.map((data) => data["serial_number"]);

    if (!following.includes(serial_number)) {
      res.status(400).send({ message: "Course not followed" });
      return;
    }
    const commentToAdd = {
      serial_number,
      username,
      body,
      like: 0,
      unlike: 0,
    };

    const newComment = Comment(commentToAdd);
    await newComment.save((err) => {
      if (err) {
        res.status(400).end();
        return;
      }
    });
    updateComment(io, serial_number, commentToAdd);
    res
      .status(200)
      .send({ message: "Successfully added ", serial_number, username, body });
  })
);

module.exports = router;
