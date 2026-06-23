import express from "express";

import {
  createArticleDetails,
  deleteArticleDetails,
  getAllArticleDetails,
  getArticleDetailsById,
  updateArticleDetails,
} from "../controllers/articleDetails.controller";
import { requireAuth, requireRole } from "../middleware/authMiddleware";

export const articleDetailRouter = express.Router();

// GET ALL
articleDetailRouter.get("/articleDetails", getAllArticleDetails);

// GET ONE
articleDetailRouter.get("/articleDetails/:id", getArticleDetailsById);

// CREATE
articleDetailRouter.post(
  "/articleDetails",
  requireAuth,
  requireRole("staff"),
  createArticleDetails,
);

// UPDATE
articleDetailRouter.patch(
  "/articleDetails/:id",
  requireAuth,
  requireRole("staff"),
  updateArticleDetails,
);

// DELETE
articleDetailRouter.delete(
  "/articleDetails/:id",
  requireAuth,
  requireRole("staff"),
  deleteArticleDetails,
);
