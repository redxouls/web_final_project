const path = require("path"); // NEW
const express = require("express");
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const courseInfo = require("../../course_info/parsed_courses.json");
const Constants = require("../constants");
const Following = require("../models/following");
const Account = require("../models/account");
const { FORMERR } = require("dns");

const accountFilePath = path.join(
  __dirname,
  "../../account_info/account_info.json"
);

let accountInfo;
fs.readFile(accountFilePath, (err, data) => {
  if (err) throw err;
  accountInfo = JSON.parse(data.toString());
});

const router = express.Router();

// For mainpage to fetch what courses the user followed
router.route("/:mode").get(
  asyncHandler(async (req, res, next) => {
    const mode = req.params.mode;
    console.log("session name: ", req.session.username);

    if (req.session.username === undefined) {
      res.status(401).send({ message: "Not authorized request" });
      return;
    }
    const username = req.session.username;

    Following.find({ username }, (err, response) => {
      if (err) {
        res.status(404).send({ error: "db error" });
        return;
      }
      if (response.length === 0) {
        res.status(500).send({ error: "failed to load following courses" });
        return;
      }

      console.log(response);
      const following = response.map((data) => data["serial_number"]);
      console.log(following);
      if (mode === "timeline") {
        const courseList = getCourseTime(following);
        if (courseList === undefined) {
          res.status(500).send({ error: "failed to generate course list" });
          return;
        }
        res.status(200).send(courseList);
        return;
      }
      if (mode === "list") {
        const courseList = following.map((serial_number) => {
          if (courseInfo[serial_number] === undefined) {
            return {};
          }
          const title = courseInfo[serial_number]["title"];
          return { serial_number: serial_number, title: title };
        });
        if (courseList === undefined) {
          res.status(500).send({ error: "failed to generate course list" });
          return;
        }
        res.status(200).send(courseList);
        return;
      }
      res.status(404).send("Invalid query parameter");
      return;
    });
  })
);
router
  .route("/")
  .post(
    express.urlencoded({ extended: false }),
    asyncHandler((req, res, next) => {
      const { serial_number } = req.body;
      const username = req.session.username;

      console.log(username, serial_number);
      console.log("session name: ", req.session.username);

      if (req.session.username === undefined) {
        res.status(401).send({ message: "Not authorized request" });
        return;
      }

      // Need to update course
      if (!Object.keys(courseInfo).includes(serial_number)) {
        res
          .status(403)
          .send({ message: "course not found, please check serial_number" });
        return;
      }
      Following.find({ username }, (err, response) => {
        if (err) {
          res.status(400).end();
        }

        const following = response.map((data) => data["serial_number"]);
        if (following.includes(serial_number)) {
          res.status(403).send({ message: "course already in list" });
          return;
        } else {
          const newFollowing = Following({
            username: username,
            serial_number: serial_number,
          });
          following.push(serial_number);
          newFollowing.save(function (err) {
            if (err) {
              res.status(400).end();
            }
            res.status(200).send({
              message: "succeddfully followed: " + serial_number,
              following,
            });
            console.log("saved");
          });
        }
      });
    })
  )
  .delete(
    express.urlencoded({ extended: false }),
    asyncHandler((req, res, next) => {
      const { serial_number } = req.body;
      const username = req.session.username;

      console.log(username, serial_number);
      console.log("session name: ", req.session.username);

      if (req.session.username === undefined) {
        res.status(401).send({ message: "Not authorized request" });
        return;
      }
      if (
        !Object.keys(courseInfo).includes(serial_number) &&
        serial_number !== "all"
      ) {
        res
          .status(403)
          .send({ message: "course not found, please check serial_number" });
        return;
      }
      Following.find({ username }, (err, response) => {
        if (err) {
          res.status(400).end();
          return;
        }

        const following = response.map((data) => data["serial_number"]);
        if (serial_number === "all") {
          Following.deleteMany({ username });
          res.status(200).send({
            message: "successfully unfollow all course",
            following: [],
          });
          return;
        }
        if (!following.includes(serial_number)) {
          res.status(403).send({ message: "course not in list" });
          return;
        } else {
          console.log(following);
          following.splice(following.indexOf(serial_number), 1);
          Following.deleteOne({ username, serial_number }, (err) => {
            if (err) res.status(400).end();
            else {
              console.log(following);
              console.log(following.indexOf(serial_number), 1);
              res.status(200).send({
                message: "successfully unfollow " + serial_number,
                following: following,
              });
            }
          });
        }
      });
    })
  );

function getCourseTime(serial_numbers) {
  const CourseList = {};
  const classInDay = {};
  Constants.CLASS_IN_DAY.forEach((time) => {
    classInDay[time] = [];
  });
  Constants.DAY_IN_WEEK.forEach((day) => {
    CourseList[day] = JSON.parse(JSON.stringify(classInDay));
  });
  serial_numbers.forEach((serial_number) => {
    const title = courseInfo[serial_number]["title"];
    const time = courseInfo[serial_number]["time"];
    time.forEach((day) => {
      const specificDay = Object.keys(day)[0];
      Object.values(day)[0].forEach((specificTime) => {
        CourseList[specificDay][specificTime].push({
          serial_number: serial_number,
          title: title,
        });
      });
    });
  });
  return CourseList;
}

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
