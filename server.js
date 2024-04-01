const express = require("express");
const next = require("next");
const cors = require("cors");

const app = next({ dev: true });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const http = require("http");
  const server = express();
  server.use(cors());

  const httpServer = http.createServer(server);

  const io = require("socket.io")(httpServer, {
    cors: {
      origin: "*", // allow all origins
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("message1", (data) => {
      console.log("Recieved from API ::", data);
      io.emit("message2", data);
    });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3033;
  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
