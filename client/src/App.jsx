import { Container } from "@mui/material";
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

  return <Container maxWidth="sm">
      
  </Container>;
};

export default App;
