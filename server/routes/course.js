const express = require("express");
const asyncHandler = require("express-async-handler");
const Course = require("../models/course");
const router = express.Router();

// For fetching course infomations
router.route("/").get(
  asyncHandler((req, res, next) => {
    if (
      req.session.username === undefined ||
      req.session.username === "guest"
    ) {
      res.status(401).send({ message: "Not authorized request" });
      return;
    }

    const serial_number = req.query.serial_number.toString();
    Course.findOne({ serial_number }, (err, courseRes) => {
      if (!courseRes) {
        res.status(404).send({ message: "No course is found !" });
        return;
      } else {
        const toResponse = {
          ...courseRes["_doc"],
          time: JSON.parse(courseRes.time),
        };

        res.status(200).send(toResponse);
        return;
      }
    }).select("-__v -_id");
  })
);

module.exports = router;
