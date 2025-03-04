import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

app.use(cors())

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true

  },
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log(`User ${socket.id} has been disconnected`);
    
  })
});



const PORT = 8000;


app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(PORT, () => {
  console.log(`Server is listening to the port ${PORT}`);
});
