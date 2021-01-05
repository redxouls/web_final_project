const { SportsHockey } = require("@material-ui/icons");
const Constants = require("./constants");

// check session
const joinRoom = (socket) => {
  const { session } = socket.request;
  const serial_number = socket.handshake.query.serial_number;
  console.log("serial_number: ", serial_number);

  const { username } = session;

  socket.join(serial_number);
  socket.emit("JOIN_ROOM", { username, status: "success" });
};

const initialize = (socket) => {
  socket.emit("INITIALIZE", { vote: { test: "test" }, comment: ["test"] });
};

const updateComment = (socket) => {
  data = { vote: {}, comment: [] };
  socket.emit("UPDATE_COMMENT", data);
  return;
};

const updateVote = (socket) => {
  comment = {};
  socket.emit("UPDATE_VOTE", { comment });
  return;
};

module.exports = (io) => {
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
};
