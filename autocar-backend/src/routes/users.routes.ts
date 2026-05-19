import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  updateAvatar,
  updateUser,
} from "../controllers/user.controller";
import { requireAuth, requireRole } from "../middleware/authMiddleware";
import { upload } from "../middleware/upload";

export const userRouter = express.Router();

userRouter.get("/users", requireAuth, requireRole("admin"), getAllUser);

userRouter.post("/users", requireAuth, createUser);

userRouter.put("/users/:id", requireAuth, updateUser);

userRouter.patch("/users/:id", requireAuth, updateUser);

userRouter.delete("/users/:id", requireAuth, requireRole("admin"), deleteUser);

userRouter.patch(
  "/users/:id/avatar",
  requireAuth,
  upload.single("avatar"),
  updateAvatar,
);
