import { Container, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { io } from "socket.io-client";

const App = () => {
  const socket = io("http://localhost:8000/");

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Connected ${socket.id}`);
    });

    socket.on("Hello", (msg) => {
      console.log(msg);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
const handleSubmit = (e) => {
  
}
  return (
    <Container maxWidth="sm">
      <Typography variant="h1" component="div" gutterBottom>
        Welcome to the chat app
      </Typography>

      <form action="">
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
        ></TextField>
        <Button variant="contained" color="primary">Send</Button>
      </form>
    </Container>
  );
};

export default App;
