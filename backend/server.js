import config from "./config/index.js";
import connectDB from "./config/db.config.js";
import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, server, io } from "./utils/seed.js";
import SessionModel from "./models/session.model.js";

//middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

//routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const listeningPort = () => {
  console.log(`server is running at http://localhost:${config.PORT}`);
  connectDB();
};

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

server.listen(config.PORT, listeningPort);
