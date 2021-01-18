const express = require("express");
const asyncHandler = require("express-async-handler");
const Comment = require("../models/comment");
const Following = require("../models/following");

const router = express.Router();

// For fetching course infomations
router.route("/").post(
  express.urlencoded({ extended: false }),
  asyncHandler(async (req, res, next) => {
    const username = req.session.username;
    const { serial_number, body } = req.body;
    if (
      req.session.username === undefined ||
      req.session.username === "guest"
    ) {
      res.status(401).send({ message: "Not authorized request" });
      return;
    }
    console.log(username);
    const response = await Following.find({ username });
    console.log(response);
    if (response.length === 0) {
      res.status(400).send({ message: "DB BAOLA" });
      return;
    }

    const following = response.map((data) => data["serial_number"]);

    if (!following.includes(serial_number)) {
      res.status(400).send({ message: "Course not followed" });
      return;
    }

    const newComment = Comment({
      serial_number,
      username,
      body,
      like: 0,
      unlike: 0,
    });
    await newComment.save((err) => {
      if (err) {
        console.log("error");
        res.status(400).end();
      }
      console.log("Comment saved");
    });

    console.log(newComment);
    res
      .status(200)
      .send({ message: "Successfully added ", serial_number, username, body });
  })
);

module.exports = router;
