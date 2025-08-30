import jwt from "jsonwebtoken";
import config from "../config/index.js";

export function cookieToken(user, res) {
  // create jwt token or auth token
  const token = jwt.sign({ _id: user._id }, config.AUTH_SECRET, {
    expiresIn: config.AUTH_EXPIRY,
  });

  res
    .status(200)
    .cookie("token", token, {
      maxAge: 7 * 60 * 60 * 1000, // 7 hours
      httpOnly: true, // prevents XSS
      sameSite: "strict", // prevents CSRF
      secure: process.env.NODE_ENV !== "development", // only https in prod
    })
    .json({ success: true, data: user });
}
