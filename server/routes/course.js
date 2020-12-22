const path = require("path"); // NEW
const express = require("express");
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const courseInfo = require("../../course_info/parsed_courses.json");

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
    console.log(serial_number);
    const info = courseInfo[serial_number];
    console.log(info);
    console.log("session name: ", req.session.username);

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

module.exports = router;
