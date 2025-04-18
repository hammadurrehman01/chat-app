import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.use((socket, next) => {
  if (true) next();
});

io.on("connection", (socket) => {
  socket.on("message", ({ message, room }) => {
    console.log("msg: ", { message, room });

    // // This will send the message to all users except the sender
    // socket.broadcast.emit("receive-message", msg)

    // // This is send the message to the particular user which we pass the id
    io.to(room).emit("receive-message", message);
  });

  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined the room ${room}`);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} has been disconnected`);
  });
});

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`Server is listening to the port ${PORT}`);
});
