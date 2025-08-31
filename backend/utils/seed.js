import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

export { app, server, io };
