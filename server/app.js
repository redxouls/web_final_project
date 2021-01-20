const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const http = require("http");

//const https = require("https");

const express = require("express");
//const logger = require("morgan");
const session = require("express-session");
const mongoose = require("mongoose");
const redis = require("redis");
const connectRedis = require("connect-redis");

const { handleSocketEvents } = require("./socket");
const apiRouter = require("./routes");

const DIST_DIR = path.join(__dirname, "../dist"); // NEW
const HTML_FILE = path.join(DIST_DIR, "index.html"); // NEW

// ========================================

if (process.env.NODE_ENV === "development") {
  console.log("NODE_ENV = development");
}

require("dotenv").config();

const {
  NODE_ENV,
  HTTPS,
  PORT,
  REDIS_HOST,
  SESSION_PREFIX,
  MONGO_URL,
  //MONGO_DB_NAME,
} = process.env;
const port = PORT || 3000;

// ========================================

const app = express();

app.use("/asset", express.static("asset"));

let server;
let protocal = "http";

if (NODE_ENV === "development" && protocal === "https") {
  console.log("Use https in development");
  protocal = "https";
  const { SSL_CRT_FILE, SSL_KEY_FILE } = process.env;
  const key = fs.readFileSync(SSL_KEY_FILE, "utf8");
  const cert = fs.readFileSync(SSL_CRT_FILE, "utf8");
  server = https.createServer({ key, cert }, app);
} else {
  server = http.createServer(app);
  console.log("Using http protocol !!!");
}

const io = require("socket.io")(server);

const redisClient = redis.createClient({
  host: REDIS_HOST,
  port: 6379,
  password: "LighteningFiveWhips",
});

redisClient.on("connect", () => {
  console.log("Successfully connected to redis store !!!");
});

const RedisStore = connectRedis(session);

// express app settings below
const sessionOptions = {
  cookie: {
    path: "/",
    httpOnly: true,
    //secure: true,
    maxAge: null,
  },
  resave: false,
  saveUninitialized: false,
  secret: "3%.#Bjj,/Qgt6'X?j'*>",
  unset: "destroy",

  store: new RedisStore({
    client: redisClient,
    prefix: SESSION_PREFIX,
  }),
};

io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res || {}, next);
});

io.use((socket, next) => {
  const { session } = socket.request;

  console.log("session:", session);

  if (session.username === undefined) {
    return next(new Error("authentication error"));
  }

  return next();
});
app.set("io", io);

const sessionMiddleware = session(sessionOptions);
app.use(sessionMiddleware);

app.use("/api", apiRouter);

// Routing for react production and react routers
app.get("/", (req, res) => {
  // req.session.username = "guest";
  res.sendFile(HTML_FILE); // EDIT
});

app.use(express.static(DIST_DIR)); // NEW

// db settings below

const dbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  auto_reconnect: true,
  useUnifiedTopology: true,
  poolSize: 10,
};

mongoose.connect(MONGO_URL, dbOptions);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("Successfully connect to MongoDB!");

  // sessionOptions.store.clear();
  //
  // Course.remove({}, () => {
  //   console.log("cleared!!!");
  // });
  // Object.values(courseInfo).forEach((course, i) => {
  //   const temp = course;
  //   temp["time"] = JSON.stringify(temp.time);
  //   temp["full_half"] = temp["full/half"];
  //   delete temp["full/half"];
  //   delete temp["week"];
  //   const newTemp = Course(temp);
  //   newTemp.save(function (err) {
  //     if (err) return console.log(err);
  //     console.log(i.toString() + " saved");
  //     // saved!
  //   });
  // });
  handleSocketEvents(io);

  server.listen(port, () =>
    console.log(`App listening at ${protocal}://localhost:${port}`)
  );
});
