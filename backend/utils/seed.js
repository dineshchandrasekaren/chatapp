import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import SessionModel from "../models/session.model.js";
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});
const onlineUsers = {};
export const getReceiverId = (userId) => onlineUsers[userId];

io.on("connection", async (socket) => {
  const userId = socket.handshake.query?.userId;
  console.log("✅ User connected:", socket.id, "User:", userId);

  // Update DB
  await SessionModel.findOneAndUpdate(
    { user: userId },
    { isOnline: true, socketId: socket.id },
    { upsert: true }
  );

  // Update in-memory object
  onlineUsers[userId] = socket.id;

  // Emit updated online users list (just userIds)
  io.emit("OnlineUsers", Object.keys(onlineUsers));

  socket.on("disconnect", async () => {
    console.log("❌ User disconnected:", socket.id);

    // Update DB
    await SessionModel.findOneAndUpdate(
      { user: userId },
      { isOnline: false, socketId: null }
    );

    // Remove user from object
    delete onlineUsers[userId];

    // Emit updated online users list
    io.emit("OnlineUsers", Object.keys(onlineUsers));
  });
});

export { app, server, io };
