import config from "./config/index.js";
import connectDB from "./config/db.config.js";
import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { app, server } from "./utils/seed.js";

dotenv.config();

const __dirname = path.resolve();
//middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
const listeningPort = () => {
  console.log(`server is running at http://localhost:${config.PORT}`);
  connectDB();
};

server.listen(config.PORT, listeningPort);
