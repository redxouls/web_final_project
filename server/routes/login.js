const path = require("path"); // NEW
const express = require("express");
const fs = require("fs");
const asyncHandler = require("express-async-handler");

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

// Handle login post
router
  .route("/")
  .post(
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
      req.session.username = username;
      res.status(201).send({ username });
      return;
    })
  )
  .delete(
    asyncHandler(async (req, res, next) => {
      req.session = null;
      res.status(204).end();
    })
  );

module.exports = router;
