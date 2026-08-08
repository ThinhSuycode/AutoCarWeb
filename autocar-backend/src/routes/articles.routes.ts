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

const authRequiredRole = [requireAuth, requireRole("admin", "staff")];

articleRouter.get("/articles", getAllArticle);
articleRouter.get("/articles/:id", ...authRequiredRole, getArticleById);

articleRouter.post("/articles", ...authRequiredRole, createArticle);

articleRouter.put("/articles/:id", ...authRequiredRole, updateArticle);

articleRouter.patch("/articles/:id", ...authRequiredRole, updateArticle);

articleRouter.delete("/articles/:id", ...authRequiredRole, deleteArticle);
