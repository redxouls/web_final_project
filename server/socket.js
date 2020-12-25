const { SportsHockey } = require("@material-ui/icons");
const Constants = require("./constants");

// check session

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
  const rooms = {};

  const updateSession = (socket) => {
    const { session } = socket.request;

    const usernameQuery = socket.handshake.query.username;
    const serial_number = socket.handshake.query.serial_number;

    console.log("username", session.username);
    console.log("serial_number: ", serial_number);

    const { username } = session;

    if (!rooms[serial_number]) {
      rooms[serial_number] = [socket];
    } else {
      rooms[serial_number].push(socket);
    }
    socket.join(serial_number);
    socket.emit("UPDATE_SESSION", { username });
    console.log("socket rooms:", socket.rooms);
  };

  io.on("connection", (socket) => {
    console.log(`A user connected, id = ${socket.id}`);
    updateSession(socket);
    //    updatePlayers(socket);
    //    updateSpaces(socket);
    //    updateNotifications(socket);

    console.log(rooms);
    socket.on("disconnect", () => {
      console.log(socket.rooms);
      console.log(`A user disconnected, id = ${socket.id}`);
      console.log(rooms);
    });
  });
};
