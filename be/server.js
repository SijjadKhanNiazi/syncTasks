const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const { Socket } = require("dgram");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const tasks = [
  { id: 1, name: "learn zustand", complete: false },
  { id: 2, name: "learn backend", complete: true },
];

app.get("/api/tasks", (req, res) => {
  try {
    res.json(tasks);
  } catch (error) {
    res.json(error);
  }
});

app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "title not found" });
  }
  const newTask = {
    id: tasks.length + 1,
    name: title,
    complete: false,
  };
  tasks.push(newTask);
  io.emit("task_created", newTask);
  res.status(201).json(newTask);
});

io.on("connection", (Socket) => {
  console.log(`A user connnected ${Socket.id}`);

  Socket.on("disconnect", (Socket) => {
    console.log(`User disconnect ${Socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`app is running ong ${PORT}`);
});
