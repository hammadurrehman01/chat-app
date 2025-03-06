import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const socket = useMemo(() => io("http://localhost:8000/"), [])

  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketID] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      setSocketID(socket.id)
      console.log(`Connected ${socket.id}`);
    });

    socket.on("receive-message", (msg) => {
      console.log(msg)
      setMessages((messages) => [...messages, msg])
    })

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('message', { message, room });
    setMessage("")
    setRoom("")
  }

  const joinRoomHandler = () => {

  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h1" component="div" gutterBottom>
        Welcome to the chat app
      </Typography>


      <Typography variant="h6" component="div" gutterBottom>{socketID}</Typography>

      <form onSubmit={joinRoomHandler}>
        <h5>Join Room</h5>
        <TextField
          value={roomName}
          onChange={(e) => e.target.value}
          variant="outlined"
          label="Room Name"
        />
        <Button type="submit" variant="contained" color="primary">Join</Button>
      </form>


      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="Message"
          variant="outlined"
        />
        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="outlined-basic"
          label="Room"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">Send</Button>
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
