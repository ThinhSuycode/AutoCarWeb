import express from "express";
import {
  register,
  login,
  changePassword,
  loginWithGoogle,
} from "../controllers/auth.controller";
import { getMe } from "../auth/me";
import { requireAuth } from "../middleware/authMiddleware";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", getMe);
router.post("/login-google", loginWithGoogle);
router.patch("/change-password", requireAuth, changePassword);

export default router;
