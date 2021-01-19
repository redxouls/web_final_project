const Constants = require("./constants");
const UserVote = require("./models/user_vote");
const Comment = require("./models/comment");
const Course = require("./models/course");

// check session
const joinRoom = (socket) => {
  const { session } = socket.request;
  const serial_number = socket.handshake.query.serial_number;
  const { username } = session;

  socket.join(serial_number);
  socket.emit("JOIN_ROOM", { username, status: "success" });
};

const initialize = async (socket) => {
  const serial_number = Array.from(socket.rooms)[1];
  const voteInfos = await UserVote.find({ serial_number }).select(
    "question option"
  );
  const vote = await getVoteInfo(serial_number);
  const comment = await getComment(serial_number);

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

  const voteInfos = await UserVote.find({ serial_number }).select(
    "question option"
  );

  voteInfos.forEach((data) => {
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
    return;
  },
};
