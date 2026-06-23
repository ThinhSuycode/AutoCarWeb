import express from "express";
import {
  register,
  login,
  loginWithGoogle,
  changePasswordAccount,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller";
import { getMe } from "../auth/me";
import { requireAuth } from "../middleware/authMiddleware";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", requireAuth, getMe);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/login-google", loginWithGoogle);
router.patch("/change-password", requireAuth, changePasswordAccount);

export default router;
