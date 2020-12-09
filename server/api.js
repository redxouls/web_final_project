const path = require("path"); // NEW
const express = require("express");
const asyncHandler = require("express-async-handler");

const DIST_DIR = path.join(__dirname, "../dist"); // NEW
const HTML_FILE = path.join(DIST_DIR, "index.html"); // NEW
const courseInfo = require("../course_info/parsed_courses.json");
const accountInfo = require("../account_info/account_info.json");
const Constants = require("./constants");

//const { userInfo } = require("os");

const router = express.Router();

//router.use(bodyParser.urlencoded({ extended: false }));
//router.use(bodyParser.json());

// For mainpage to fetch what courses the user followed
router.route("/api/user").get(
  asyncHandler(async (req, res, next) => {
    const username = req.query.username;
    const mode = req.query.mode;
    const following = accountInfo[username]["following"];

    console.log(Object.keys(courseInfo).length);
    if (following === undefined) {
      res.status(404).send({ following: [] });
      return;
    }
    if (mode === "timeline_list") {
      const courseList = getCourseTime(following);
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
      res.status(200).send(courseList);
      return;
    }
    res.status(404).send("Invalid query parameter");
  })
);

// For fetching course infomations
router.route("/api/course").get((req, res) => {
  const serial_number = req.query.serial_number.toString();
  console.log(serial_number);
  const info = courseInfo[serial_number];
  console.log(info);

  if (info === undefined) {
    res.status(404).send({});
  } else {
    response = info;
    res.status(200).send(response);
  }
});

// Handle login post
router.route("/login").post(
  express.urlencoded({ extended: false }),
  asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    let statusCode, response;

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
  })
);

// Routing for react production and react routers
router.route("/").get((req, res) => {
  req.session.username = "guest";
  res.sendFile(HTML_FILE); // EDIT
});

router.use(express.static(DIST_DIR)); // NEW

router.get("/session", (req, res) => {
  console.log(req.session.username);
  if (req.session.username === "guest") {
    res.setHeader("Content-Type", "text/html");
    res.write("<p>You are a guest</p>");
    res.end();
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write("<p>username: " + req.session.username + "</p>");
    res.end();
  }
});

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

module.exports = router;
