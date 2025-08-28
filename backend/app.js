import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

export default app;
