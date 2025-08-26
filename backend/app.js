import express from "express";
import authRoutes from "./routes/auth.route.js";

import cookieParser from "cookie-parser";

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());



//routes
app.use("/api/auth", authRoutes);

export default app;
