const express = require("express");
const next = require("next");
const cors = require("cors");
const axios = require("axios");

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

  const emitData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/cars/random",
      );
      const data = response.data;
      io.emit("generatedCar", data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  emitData(); // Call initially when a client connects

  const intervalId = setInterval(emitData, 500); // Call every 2 seconds

  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("disconnect", () => {
      clearInterval(intervalId);
      console.log("Client disconnected");
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
