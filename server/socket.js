const Constants = require("./constants");
const UserVote = require("./models/user_vote");
const Comment = require("./models/comment");
const Course = require("./models/course");

// check session
const joinRoom = (socket) => {
  const { session } = socket.request;
  const serial_number = socket.handshake.query.serial_number;
  console.log("serial_number: ", serial_number);

  const { username } = session;

  socket.join(serial_number);
  socket.emit("JOIN_ROOM", { username, status: "success" });
};

const initialize = async (socket) => {
  //console.log(socket.rooms);
  const serial_number = Array.from(socket.rooms)[1];
  const voteInfos = await UserVote.find({ serial_number }).select(
    "question option"
  );
  const vote = await getVoteInfo(serial_number);
  const comment = await getComment(serial_number);

  console.log(vote);
  // {
  //   time: { 第二節: 100, 第一節: 10, 第三節: 0 },
  //   priority: { 第一節: 80, 第二節: 10, 第三節: 0 },
  //   people: { "1~5": 87, "6~10": 59, 全簽: 0 },
  // },
  // [
  //   { username: "KFC", body: "hihi", like: 14, unlike: 2 },
  //   { username: "KFC2", body: "haha", like: 14, unlike: 2 },
  //   { username: "KFC3", body: "I have no girlfriend", like: 50, unlike: 0 },
  //   { username: "KFC4", body: "我也是苗栗人ㄟ", like: 59, unlike: 1 },
  //   { username: "KFC5", body: "煙火真好看", like: 14, unlike: 2 },
  //   { username: "KFC6", body: "想不到ㄌ", like: 87, unlike: 0 },
  // ],

  socket.emit("INITIALIZE", {
    vote,
    comment,
  });
};

const updateComment = (io, serial_number, newComment) => {
  io.to(serial_number).emit("UPDATE_COMMENT", { comment: newComment });
  return;
};

const updateVote = async (io, serial_number) => {
  const vote = await getVoteInfo(serial_number);
  io.to(serial_number).emit("UPDATE_VOTE", { vote });
  return;
};

const getVoteInfo = async (serial_number) => {
  const vote = {};

  Constants.RULES.forEach((question) => {
    vote[question] = {};
  });

  // generate all options for time
  const courseTimeRes = await Course.findOne({ serial_number }).select("time");
  const courseTime = JSON.parse(courseTimeRes.time);
  courseTime.forEach((day) => {
    Object.keys(day).forEach((currentDay) => {
      const classes = day[currentDay];
      classes.forEach((currentClass) => {
        vote["time"][currentDay + " " + currentClass] = 0;
      });
    });
  });

  vote["people"] = JSON.parse(JSON.stringify(Constants.PEOPLE));
  vote["priority"] = JSON.parse(JSON.stringify(Constants.PRIORITY));
  console.log(Constants.PEOPLE);
  console.log(Constants.PRIORITY);

  const voteInfos = await UserVote.find({ serial_number }).select(
    "question option"
  );

  console.log("vote", vote);
  voteInfos.forEach((data) => {
    console.log("db vote", data.question, data.option);
    if (vote[data.question]) {
      vote[data.question][data.option] += 1;
    }
  });
  const toReturn = {};
  Object.keys(vote).forEach((question) => {
    toReturn[question] = Object.fromEntries(
      Object.entries(vote[question]).sort(([, a], [, b]) => b - a)
    );
  });

  return toReturn;
};

const getComment = async (serial_number) => {
  const comment = await Comment.find({ serial_number }).select(
    "username body like unlike -_id"
  );
  return comment;
};

module.exports = {
  handleSocketEvents: (io) => {
    io.on("connection", (socket) => {
      console.log(`A user connected, id = ${socket.id}`);
      joinRoom(socket);
      initialize(socket);
      //updateVote(socket);
      //updateComment(socket);

      socket.on("disconnect", () => {
        console.log(socket.rooms);
        console.log(`A user disconnected, id = ${socket.id}`);
      });
    });
  },
  updateComment: async (io, serial_number, newComment) => {
    io.to(serial_number).emit("UPDATE_COMMENT", { comment: newComment });
    return;
  },
  updateVote: async (io, serial_number) => {
    const vote = await getVoteInfo(serial_number);
    io.to(serial_number).emit("UPDATE_VOTE", { vote });
    console.log("UPDATE_VOTE", { vote });
    return;
  },
};
