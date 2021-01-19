f
const express = require("express");
const path = require("path"); // NEW
const { useReducer } = require("react");

const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, "../dist"); // NEW
const HTML_FILE = path.join(DIST_DIR, "index.html"); // NEW

const course_info = require("../course_info/parsed_courses.json");
const user_info = require("../user_info/user_info.json");

const mockResponse = {
  foo: "bar",
  bar: "foo",
};

app.use(express.static(DIST_DIR)); // NEW

// Routing for apis

// For mainpage to fetch what courses the user followed
app.get("/api/user", (req, res) => {
  const username = req.query.username;
  const following = user_info[username]["following"];

  if (following === undefined) {
    res.status(404).send({ following: [] });
  } else {
    response = { following: following };
    res.status(200).send(response);
  }
});

// For fetching course infomations
app.get("/api/course", (req, res) => {
  const serial_number = req.query.serial_number.toString();
  console.log(serial_number);
  const info = course_info[serial_number];
  console.log(info);

  if (info === undefined) {
    res.status(404).send({});
  } else {
    response = info;
    res.status(200).send(response);
  }
});

// Routing for react production and react routers

app.get("/", (req, res) => {
  res.sendFile(HTML_FILE); // EDIT
});

app.listen(port, function () {
  console.log("App listening on port: " + port);
});
