import express from "express";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller.js";
import { isLogin } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(isLogin);
router.get("/users", getUsersForSidebar);
router.get("/:id", getMessages);

router.post("/send/:id", sendMessage);

export default router;
