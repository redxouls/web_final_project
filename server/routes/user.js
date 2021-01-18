const express = require("express");
const asyncHandler = require("express-async-handler");
const Constants = require("../constants");
const Following = require("../models/following");
const Course = require("../models/course");

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

    Following.find({ username }, async (err, response) => {
      if (err) {
        res.status(404).send({ error: "db error" });
        return;
      }

      const following = response.map((data) => data["serial_number"]);
      if (mode === "timeline") {
        const courseList = await getCoursesTime(following);
        if (courseList === undefined) {
          res.status(500).send({ error: "failed to generate course list" });
          return;
        }
        res.status(200).send(courseList);
        return;
      }
      if (mode === "list") {
        const courseList = [];
        for (const serial_number of following) {
          const exisist = await checkCourse(serial_number);
          if (!exisist) {
            return {};
          }
          const title = exisist["title"];
          courseList.push({ serial_number, title });
        }
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
    asyncHandler(async (req, res, next) => {
      const { serial_number } = req.body;
      const username = req.session.username;

      console.log(username, serial_number);
      console.log("session name: ", req.session.username);

      if (req.session.username === undefined) {
        res.status(401).send({ message: "Not authorized request" });
        return;
      }

      // Need to update course
      const exisist = await checkCourse(serial_number);
      if (!exisist) {
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
    asyncHandler(async (req, res, next) => {
      const { serial_number } = req.body;
      const username = req.session.username;

      console.log(username, serial_number);
      console.log("session name: ", req.session.username);
      const exisist = await checkCourse(serial_number);
      if (req.session.username === undefined) {
        res.status(401).send({ message: "Not authorized request" });
        return;
      }
      if (!exisist && serial_number !== "all") {
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
          following.splice(following.indexOf(serial_number), 1);
          Following.deleteOne({ username, serial_number }, (err) => {
            if (err) res.status(400).end();
            else {
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

const getCourse = async (serial_number) => {
  const response = await Course.findOne({ serial_number }).select("time title");
  return response;
};

async function getCoursesTime(serial_numbers) {
  const CourseList = {};
  const classInDay = {};
  Constants.CLASS_IN_DAY.forEach((time) => {
    classInDay[time] = [];
  });
  Constants.DAY_IN_WEEK.forEach((day) => {
    CourseList[day] = JSON.parse(JSON.stringify(classInDay));
  });
  for (const serial_number of serial_numbers) {
    const singleCourseInfo = await getCourse(serial_number);
    const title = singleCourseInfo["title"];
    const time = JSON.parse(singleCourseInfo["time"]);
    time.forEach((day) => {
      const specificDay = Object.keys(day)[0];
      Object.values(day)[0].forEach((specificTime) => {
        CourseList[specificDay][specificTime].push({
          serial_number: serial_number,
          title: title,
        });
      });
    });
  }
  return CourseList;
}

const checkCourse = async (serial_number) => {
  const response = await Course.findOne({ serial_number });
  return response;
};

module.exports = router;
