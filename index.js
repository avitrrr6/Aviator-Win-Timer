const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const moment = require("moment");
require("dotenv").config();
const AviatorStart = require("./controller/AviatorStart");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  },
});

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 4000;
const allRoutes = require("./routes/Routes");
const { deCryptData } = require("./helper");
app.use("", allRoutes);
io.on("connection", (socket) => {});

let x = true;
let trx = true;
//////////////////////
if (x) {
  console.log("Waiting for the next minute to start...");
  const now = new Date();
  const secondsUntilNextMinute = 60 - now.getSeconds();
  console.log(
    "start after ",
    moment(new Date()).format("HH:mm:ss"),
    secondsUntilNextMinute
  );

  setTimeout(() => {
    AviatorStart.aviator_Start_function(io);
    x = false;
  }, secondsUntilNextMinute * 1000);
}


app.get("/", (req, res) => {
  res.send(`<h1>server running at port=====> ${PORT}</h1>`);
});

httpServer.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
