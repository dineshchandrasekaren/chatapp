import { Router } from "express";
import {
  login,
  signup,
  logout,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
import { isLogin } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", isLogin, logout);

router.put("/updateProfile", isLogin, updateProfile);
router.get("/authCheck", isLogin, checkAuth);

export default router;
