const path = require("path"); // NEW
const express = require("express");
const fs = require("fs");
const asyncHandler = require("express-async-handler");

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

    const following = accountInfo[username]["following"];
    if (!following.includes(serial_number)) {
      res.status(403).send({ message: "course not in list" });
      return;
    }
    const lastVote = parseInt(
      accountInfo[username]["vote"][serial_number][question][1]
    );
    const currentTime = Date.now();

    if (currentTime - lastVote < 1000 * 60) {
      res.status(403).send({ message: "vote too often" });
      return;
    }

    accountInfo[username]["vote"][serial_number][question][0] = option;
    accountInfo[username]["vote"][serial_number][
      question
    ][1] = currentTime.toString();

    updateAccountInfo(accountFilePath, accountInfo);
    res.status(200).send({
      message: "vote requsest",
      title: courseInfo[serial_number].title,
      username: username,
      following: accountInfo[username]["following"],
      vote_status: accountInfo[username]["vote"],
    });
    return;
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
