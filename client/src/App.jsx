import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const socket = useMemo(() => io("http://localhost:8000/"), []);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketID] = useState("");
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setSocketID(socket.id);
      console.log(`Connected ${socket.id}`);
    });

    socket.on("receive-message", (msg) => {
      console.log(msg);
      setMessages((messages) => [...messages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h1" component="div" gutterBottom>
        Welcome to the chat app
      </Typography>

      {/* <Typography variant="h6" component="div" gutterBottom>
        {socketID}
      </Typography> */}

      <form onSubmit={joinRoomHandler}>
        <h5>Join Room</h5>
        <Stack
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: "8px",
          }}
        >
          <TextField
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            variant="outlined"
            label="Room Name"
            sx={{ width: { xs: "100%", md: "50%" } }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: { xs: "100%", md: "15%" } }}
          >
            Join
          </Button>
        </Stack>
      </form>

      <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
        <h5>Send Message</h5>
        <Stack
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: "8px",
          }}
        >
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            id="outlined-basic"
            label="Message"
            variant="outlined"
            sx={{ width: { xs: "100%", md: "50%" } }}
          />
          <TextField
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            id="outlined-basic"
            label="Room"
            variant="outlined"
            sx={{ width: { xs: "100%", md: "50%" } }}
          />
        </Stack>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: "4px", width: { xs: "100%", md: "15%" } }}
        >
          Send
        </Button>
      </form>

      <Stack>
        {messages.map((m, i) => (
          <Typography key={i}>{m}</Typography>
        ))}
      </Stack>
    </Container>
  );
};

export default App;
