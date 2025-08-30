import { asyncHandler } from "../middlewares/async-handler.middleware.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { cookieToken } from "../utils/cookieToken.util.js";
import cloudinary from "../config/cloudinary.config.js";
export const signup = asyncHandler(async (req, res) => {
  const { body = {} } = req;
  let { fullName = "", email = "", password = "" } = body;

  // input check
  if (!fullName || !email || !password) {
    return res
      .status(404)
      .json({ success: false, message: "Please fill all the details" });
  }

  // check user already exist
  const userExist = await userModel.findOne({ email });

  if (userExist) {
    return res
      .status(400)
      .json({ success: false, message: "Account already exist." });
  }

  // password hash
  const hashedPassword = await bcrypt.hash(password, 8);

  //create a new user
  const User = new userModel({ fullName, email, password: hashedPassword });

  // save the user to db
  await User.save();
  User.password = undefined;

  // generate a token, save a token in cookie and send a response to client
  cookieToken(User.toObject(), res);
});

export const login = asyncHandler(async (req, res) => {
  const { body = {} } = req;

  const { email = "", password = "" } = body;

  //Empty check
  if (!email || !password)
    return res
      .status(404)
      .json({ success: false, message: "Please enter your credientials." });

  //get the user by email
  const User = await userModel.findOne({ email }).select("+password");

  // check user exist
  if (!User)
    return res
      .status(400)
      .json({ success: false, message: "Account not found" });

  //compare the password
  const isCorrectPassword = await bcrypt.compare(password, User.password);

  if (!isCorrectPassword)
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password." });

  // remove the password from response
  User.password = undefined;

  // generate a token, save a token in cookie and send a response to client
  cookieToken(User.toObject(), res);
});

export const logout = asyncHandler(async (_, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ success: true, message: "successfully loggedout" });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { profilePic } = req.body;
  const userId = req.user._id;

  if (!profilePic) {
    return res.status(400).json({ message: "Profile pic is required" });
  }

  const uploadResponse = await cloudinary.uploader.upload(profilePic);
  console.log(uploadResponse);

  const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    { profilePic: uploadResponse.secure_url },
    { new: true }
  );

  res.status(200).json({ success: true, data: updatedUser.toObject() });
});

export const checkAuth = asyncHandler(async (req, res) => {
  console.log({ auth: req.user });

  res.status(200).json({ success: true, data: req.user });
});
