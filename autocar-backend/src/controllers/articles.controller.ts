import type { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
import logger from "../utils/logger";

import type { AuthRequest } from "../middleware/authMiddleware";
import { articleSchema, updateArticleSchema } from "../schemas/article.schema";
import { validateObjectId } from "../utils/validateObjectId";
import { articlesService } from "../services/articles.service";
import {
  validateCreateArticle,
  validateUpdateArticle,
  validateUpdateStatusArticle,
} from "../validators/vaildateArticle";

// ───────────────── GET ALL ─────────────────
export const getAllArticle = catchAsync(async (req: Request, res: Response) => {
  const articles = await articlesService.getAll(
    req.query as Record<string, string>,
  );
  res.status(200).json(articles);
});

// ───────────────── GET BY ID ─────────────────
export const getArticleById = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const id = validateObjectId(req.params.id);
    const article = await articlesService.getById(id);
    res.status(200).json(article);
  },
);
export const createArticle = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const validated = validateCreateArticle(req.body);

    const article = await articlesService.create(validated, req.user);

    logger.info("Article Created", {
      articleId: article._id,
      by: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: article,
    });
  },
);
// ───────────────── UPDATE ─────────────────
export const updateArticle = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new AppError("Authorization", 401);
    const id = validateObjectId(req.params.id);

    const validated = validateUpdateArticle(req.body);

    const article = await articlesService.update(id, validated, req.user._id);
    logger.info("Article updated", {
      articleId: id,
      by: req.user?._id,
    });

    res.json({
      success: true,
      data: article,
    });
  },
);

// ───────────────── UPDATE ─────────────────
export const updateStatusArticle = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new AppError("Authorization", 401);
    const id = validateObjectId(req.params.id);

    const validated = validateUpdateStatusArticle(req.body);

    const { status } = validated;

    const article = await articlesService.updateStatus(
      id,
      status,
      req.user._id,
    );

    logger.info("Article updated status", {
      articleId: id,
      by: req.user?._id,
    });

    res.json({
      success: true,
      data: article,
    });
  },
);

// ───────────────── DELETE ─────────────────
export const deleteArticle = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const id = validateObjectId(req.params.id);

    const artciles = await articlesService.delete(id);

    artciles.timeline.push({
      action: "DELETE",
      note: "Xoá bài viết",
      userId: req.user?._id,
    });

    logger.info("Article deleted", {
      articleId: id,
      by: req.user?._id,
    });

    res.status(200).json({
      message: "Xoá bài viết thành công!",
    });
  },
);
