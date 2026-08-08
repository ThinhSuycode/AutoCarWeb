import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  toggleArticleSave,
  toggleFavouriteCar,
  updateAvatar,
  updateUser,
} from "../controllers/user.controller";
import { requireAuth, requireRole } from "../middleware/authMiddleware";
import { upload } from "../middleware/upload";

export const userRouter = express.Router();

userRouter.get("/users", requireAuth, requireRole("admin"), getAllUser);

userRouter.put("/users/:id", requireAuth, updateUser);

userRouter.post("/users", requireAuth, createUser);

userRouter.patch("/users/:id", requireAuth, updateUser);

userRouter.patch("/users/:id/favourite", requireAuth, toggleFavouriteCar);

userRouter.patch("/users/:id/article", requireAuth, toggleArticleSave);

userRouter.patch(
  "/users/:id/avatar",
  requireAuth,
  upload.single("avatar"),
  updateAvatar,
);

userRouter.delete("/users/:id", requireAuth, requireRole("admin"), deleteUser);
