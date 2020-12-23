const Constants = require("./constants");

// check session
function updateSession(socket) {
  const { session } = socket.request;

  const token = socket.handshake.query.token;
  console.log("username", session.username);
  console.log("token name: ", token);

  const { username } = session;
  socket.emit("UPDATE_SESSION", { username });
}

function iniateVote(socket) {
  return;
}

function iniateComment(socket) {
  return;
}

function updateVote(socket) {
  return;
}

function updateComment(socket) {
  return;
}

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`A user connected, id = ${socket.id}`);
    updateSession(socket);
    //    updatePlayers(socket);
    //    updateSpaces(socket);
    //    updateNotifications(socket);
    socket.on("disconnect", () => {
      console.log(`A user disconnected, id = ${socket.id}`);
    });
  });
};
