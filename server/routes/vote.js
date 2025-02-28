const express = require("express");
const asyncHandler = require("express-async-handler");
const Following = require("../models/following");
const UserVote = require("../models/user_vote");
const Course = require("../models/course");
const Constants = require("../constants");
const { updateVote } = require("../socket");

const router = express.Router();

router.route("/").post(
  express.urlencoded({ extended: false }),
  asyncHandler(async (req, res, next) => {
    if (!req.session.username) {
      res.status(401).send({ message: "Not authorized request" });
      return;
    }
    const username = req.session.username;
    const { serial_number, option, question } = req.body;
    const io = req.app.get("io");

    if (!serial_number || !option || !Constants.RULES.includes(question)) {
      res.status(404).send({ message: "Invalid request body" });
      return;
    }
    const exisist = await checkCourse(serial_number);
    if (!exisist) {
      res.status(404).send({ message: "Course not found!!!" });
      return;
    }
    Following.find({ username }, (err, response) => {
      if (err) {
        res.status(400).end();
        return;
      }
      const following = response.map((data) => data["serial_number"]);
      if (!following.includes(serial_number)) {
        res.status(403).send({ message: "course not in list" });
        return;
      }
      UserVote.findOne(
        { username, serial_number, question },
        (err, response) => {
          if (err) {
            res.status(400).end();
          }
          if (!response) {
            const newUserVote = UserVote({
              username,
              serial_number,
              question,
              option,
              time: Date.now().toString(),
            });
            newUserVote.save(async (err) => {
              if (err) {
                res.status(400).end();
                return;
              }
              updateVote(io, serial_number);
              res.status(200).send({
                message:
                  "Successfully vote for " +
                  serial_number +
                  " question " +
                  question +
                  " option " +
                  option,
                response,
              });
            });
          } else {
            const currentTime = Date.now();

            if (currentTime - response["time"] < 1000 * 10) {
              res.status(403).send({ message: "vote too often" });
              return;
            }
            response.overwrite({
              username,
              serial_number,
              question,
              option,
              time: Date.now().toString(),
            });
            response.save(async (err) => {
              if (err) {
                res.status(400).end();
                return;
              }
              updateVote(io, serial_number);
              res.status(200).send({
                message:
                  "Successfully vote for " +
                  serial_number +
                  " question " +
                  question +
                  " option " +
                  option,
                response,
              });
            });
          }
        }
      );
    });
  })
);

const checkCourse = async (serial_number) => {
  const response = await Course.findOne({ serial_number });
  return response;
};

module.exports = router;
