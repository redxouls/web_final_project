const path = require("path"); // NEW
const express = require("express");
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const Following = require("../models/following");
const UserVote = require("../models/user_vote");
//const CourseVote = require("../models/course_vote");
let courseInfo = require("../../course_info/parsed_courses.json");
const Constants = require("../constants");

const accountFilePath = path.join(
  __dirname,
  "../../account_info/account_info.json"
);
const voteFilePath = path.join(__dirname, "../../vote_info/parsed_courses.js");

let accountInfo;
fs.readFile(accountFilePath, (err, data) => {
  if (err) throw err;
  accountInfo = JSON.parse(data.toString());
});

const router = express.Router();

router.route("/").post(
  express.urlencoded({ extended: false }),
  asyncHandler(async (req, res, next) => {
    if (req.session.username === undefined) {
      res.status(401).send({ message: "Not authorized request" });
      return;
    }
    const username = req.session.username;
    const { serial_number, option, question } = req.body;

    if (
      !serial_number ||
      !option ||
      !["time", "people", "rule"].includes(question)
    ) {
      res.status(404).send({ message: "Invalid request body" });
      return;
    }

    if (!Object.keys(courseInfo).includes(serial_number)) {
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
        { username, serial_number, question, option },
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
            newUserVote.save((err) => {
              if (err) {
                res.status(400).end();
                return;
              }
              console.log("saved");
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

            if (currentTime - response["time"] < 1000 * 60) {
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
            response.save((err) => {
              if (err) {
                res.status(400).end();
                return;
              }
              console.log("saved");
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

async function updateAccountInfo(path, updatedInfo) {
  fs.writeFileSync(path, JSON.stringify(updatedInfo), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Write file complete.");
    }
  });
}

module.exports = router;
