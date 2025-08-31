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
    origin: ["http://localhost:5173", "http://192.168.1.8:5173"],
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

io.on("connection", async (socket) => {
  console.log("User connected with ", socket.id);
  const userId = socket.handshake.query?.userId;
  await SessionModel.findOneAndUpdate(
    { user: userId },
    { isOnline: true, socketId: socket.id }
  );

  const allOnline = await SessionModel.find({ isOnline: true });

  const filteredOnline = allOnline.map(({ user, socketId }) => ({
    [socketId]: user,
  }));

  io.emit("getOnlineUsers", Object.keys(filteredOnline));

  socket.on("disconnect", async () => {
    console.log("❌ User disconnected:", socket.id);
    await SessionModel.findOneAndUpdate(
      { user: userId },
      { isOnline: false, socketId: null }
    );
  });
});

server.listen(config.PORT, listeningPort);
