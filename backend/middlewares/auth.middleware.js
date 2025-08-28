import { asyncHandler } from "./async-handler.middleware.js";
import userModel from "../models/user.model.js";
import config from "../config/index.js";
import jwt from "jsonwebtoken";

export const isLogin = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  const decoded = jwt.verify(token, config.AUTH_SECRET);

  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized - Invalid Token" });
  }

  const user = await userModel.findById(decoded.userId).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  req.user = user;

  next();
});
