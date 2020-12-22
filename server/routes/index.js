const express = require("express");
const userRouter = require("./user");
const courseRouter = require("./course");
const loginRouter = require("./login");
const voteRouter = require("./vote");

const router = express.Router();

// For mainpage to fetch what courses the user followed
router.use("/user", userRouter);

// For fetching course infomations
router.use("/course", courseRouter);

// Handle login post
router.use("/login", loginRouter);

// Handle Vote
router.use("/vote", voteRouter);

module.exports = router;
