const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
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

// WebSockets Connection Logic
io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // ⚡ 1. NAYA LISTENER: Ab server direct client se WS message sunega
  socket.on("add_task_via_ws", (data) => {
    // Agar Postman se JSON bhej rahe hain to verify karein ke usme 'title' ho
    if (data && data.title) {
      const newTask = {
        id: tasks.length + 1,
        name: data.title,
        complete: false,
      };

      tasks.push(newTask); // Array me save kiya

      // ⚡ Sab ko broadcast kar diya (Frontend isey receive karega)
      io.emit("task_created", newTask);
      console.log(`📝 Task added via WebSocket: ${data.title}`);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
