import { asyncHandler } from "./async-handler.middleware.js";
import userModel from "../models/user.model.js";
import config from "../config/index.js";
import jwt from "jsonwebtoken";
import SessionModel from "../models/session.model.js";

export const isLogin = asyncHandler(async (req, res, next) => {
  const { token = "" } = req.cookies;
  if (!token) {
    return res.status(404).json({ message: "Unauthorized - Invalid Token" });
  }

  const decoded = jwt.verify(token, config.AUTH_SECRET);

  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized - Invalid Token" });
  }

  const user = await userModel.findById(decoded._id);
  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  const session = await SessionModel.findOneAndUpdate(
    { user: decoded._id, token },
    { lastAccessedAt: Date.now() }
  );
  if (!session) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res
      .status(401)
      .json({ message: "Unauthorized - Invalid Token", success: false });
  }

  req.user = user;

  next();
});
