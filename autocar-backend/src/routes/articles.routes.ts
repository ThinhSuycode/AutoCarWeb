import express from "express";
import {
  createArticle,
  deleteArticle,
  getAllArticle,
  updateArticle,
} from "../controllers/articles.controller";
import { requireAuth, requireRole } from "../middleware/authMiddleware";

export const articleRouter = express.Router();

articleRouter.get("/articles", getAllArticle);
articleRouter.put(
  "/articles/:id",
  requireAuth,
  requireRole("admin"),
  updateArticle,
);
articleRouter.patch(
  "/articles/:id",
  requireAuth,
  requireRole("staff"),
  updateArticle,
);
articleRouter.post(
  "/articles",
  requireAuth,
  requireRole("staff"),
  createArticle,
);
articleRouter.delete(
  "/articles/:id",
  requireAuth,
  requireRole("staff"),
  deleteArticle,
);
