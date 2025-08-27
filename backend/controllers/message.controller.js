import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../config/cloudinary.config.js";
import { asyncHandler } from "../middlewares/async-handler.middleware.js";

export const getUsersForSidebar = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id;
  const filteredUsers = await User.find({
    _id: { $ne: loggedInUserId },
  });

  res.status(200).json(filteredUsers);
});

export const getMessages = asyncHandler(async (req, res) => {
  const { id: userToChatId } = req.params;
  const myId = req.user._id;

  const messages = await Message.find({
    $or: [
      { senderId: myId, receiverId: userToChatId },
      { senderId: userToChatId, receiverId: myId },
    ],
  });

  res.status(200).json(messages);
});

export const sendMessage = asyncHandler(async (req, res) => {
  const { text, image } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  let imageUrl;
  if (image) {
    // Upload base64 image to cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image);
    imageUrl = uploadResponse.secure_url;
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    text,
    image: imageUrl,
  });

  await newMessage.save();

  res.status(201).json(newMessage);
});
