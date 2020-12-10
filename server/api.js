const path = require("path"); // NEW
const express = require("express");
const fs = require("fs");
const asyncHandler = require("express-async-handler");

const DIST_DIR = path.join(__dirname, "../dist"); // NEW
const HTML_FILE = path.join(DIST_DIR, "index.html"); // NEW
let courseInfo = require("../course_info/parsed_courses.json");
let accountInfo = require("../account_info/account_info.json");
const accountFilePath = path.join(
  __dirname,
  "../account_info/account_info.json"
);
const Constants = require("./constants");
//const { userInfo } = require("os");

const router = express.Router();

//router.use(bodyParser.urlencoded({ extended: false }));
//router.use(bodyParser.json());

// For mainpage to fetch what courses the user followed
router
  .route("/user")
  .get(
    asyncHandler(async (req, res, next) => {
      const username = req.query.username;
      const mode = req.query.mode;

      if (!Object.keys(accountInfo).includes(username)) {
        res.status(404).send({ error: "no user found" });
        return;
      }

      const following = accountInfo[username]["following"];
      if (following === undefined) {
        res.status(500).send({ error: "failed to load following courses" });
        return;
      }
      if (mode === "timeline_list") {
        const courseList = getCourseTime(following);
        if (courseList === undefined) {
          res.status(500).send({ error: "failed to generate course list" });
          return;
        }
        res.status(200).send(courseList);
        return;
      }
      if (mode === "simple_list") {
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
    })
  )
  .post(
    express.urlencoded({ extended: false }),
    asyncHandler((req, res, next) => {
      const { username, method, serial_number } = req.body;
      console.log(username, method, serial_number);
      if (!Object.keys(courseInfo).includes(serial_number)) {
        res
          .status(403)
          .send({ message: "course not found, please check serial_number" });
        return;
      }
      if (!Object.keys(accountInfo).includes(username)) {
        res.status(403).send({ message: "user not found" });
        return;
      }
      const following = accountInfo[username]["following"];

      if (method === "follow") {
        console.log("handle follow request", method);
        if (following.includes(serial_number)) {
          res.status(403).send({ message: "course already in list" });
          return;
        } else {
          accountInfo[username]["following"].push(serial_number);
          res.status(201).send({
            message: "successfully follow " + serial_number,
            following: accountInfo[username]["following"],
          });
          updateAccountInfo(accountInfo);
          return;
        }
      }
      if (method === "unfollow") {
        if (!following.includes(serial_number)) {
          res.status(403).send({ message: "course not in list" });
          return;
        } else {
          accountInfo[username]["following"].splice(
            accountInfo[username]["following"].indexOf(serial_number),
            1
          );
          res.status(201).send({
            message: "successfully unfollow " + serial_number,
            following: accountInfo[username]["following"],
          });
          updateAccountInfo(accountInfo);
          return;
        }
      }
    })
  );

// For fetching course infomations
router.route("/course").get(
  asyncHandler((req, res, next) => {
    const serial_number = req.query.serial_number.toString();
    console.log(serial_number);
    const info = courseInfo[serial_number];
    console.log(info);

    if (info === undefined) {
      res.status(404).send({ message: "No course is found !" });
      return;
    } else {
      response = info;
      res.status(200).send(response);
      return;
    }
  })
);

// Handle login post
router.route("/login").post(
  express.urlencoded({ extended: false }),
  asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).end();
      return;
    }
    if (!Object.keys(accountInfo).includes(username)) {
      res.status(400).end();
      return;
    }
    if (accountInfo[username]["password"] !== password) {
      res.status(401).end();
      return;
    }
    response = { status: "Successfully logined" };
    req.session.name = username;
    res.status(201).send({ username });
    return;
  })
);

router.route("/session").get(
  asyncHandler((req, res, next) => {
    console.log(req.session.username);
    if (req.session.username === "guest") {
      res.setHeader("Content-Type", "text/html");
      res.write("<p>You are a guest</p>");
      res.end();
      return;
    } else {
      res.setHeader("Content-Type", "text/html");
      res.write("<p>username: " + req.session.username + "</p>");
      res.end();
      return;
    }
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

async function updateAccountInfo(updatedInfo) {
  fs.writeFileSync(accountFilePath, JSON.stringify(updatedInfo), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Write file complete.");
    }
  });
}

module.exports = router;
