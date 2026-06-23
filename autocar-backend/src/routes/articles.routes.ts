import express from "express";
import {
  createArticle,
  deleteArticle,
  getAllArticle,
  getArticleById,
  updateArticle,
} from "../controllers/articles.controller";
import { requireAuth, requireRole } from "../middleware/authMiddleware";

export const articleRouter = express.Router();

articleRouter.get("/articles", getAllArticle);
articleRouter.get(
  "/articles/:id",
  requireAuth,
  requireRole("staff"),
  getArticleById,
);
articleRouter.put(
  "/articles/:id",
  requireAuth,
  requireRole("staff"),
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
