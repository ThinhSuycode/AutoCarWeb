import type { Request, Response } from "express";
import mongoose from "mongoose";
import type { ZodError } from "zod";

import { ArticleDetails } from "../models/articleDetails.model";
import { Articles } from "../models/articles.model";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
import logger from "../utils/logger";
import type { AuthRequest } from "../middleware/authMiddleware";
import {
  articleDetailSchema,
  updateArticleDetailSchema,
} from "../schemas/articleDetail.schema";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const validateObjectId = (id: unknown): string => {
  if (typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("ID không hợp lệ!", 400);
  }
  return id;
};

const formatZodError = (error: ZodError): string =>
  error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(" | ");

// ─── GET ALL ──────────────────────────────────────────────────────────────────
export const getAllArticleDetails = catchAsync(
  async (req: Request, res: Response) => {
    const data = await ArticleDetails.find()
      .populate("articleId")
      .populate("relatedArticles")
      .select("-__v")
      .lean();

    res.status(200).json(data);
  },
);

// ─── GET BY ARTICLE ID ────────────────────────────────────────────────────────
export const getArticleDetailsById = catchAsync(
  async (req: Request, res: Response) => {
    const id = validateObjectId(req.params.id);

    const data = await ArticleDetails.findOne({ articleId: id })
      .populate("articleId")
      .populate("relatedArticles")
      .select("-__v")
      .lean();

    res.status(200).json(data ?? null);
  },
);

// ─── CREATE ───────────────────────────────────────────────────────────────────
export const createArticleDetails = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new AppError("Unauthorized!", 401);

    const validated = articleDetailSchema.safeParse(req.body);
    if (!validated.success) {
      throw new AppError(formatZodError(validated.error), 400);
    }

    const { articleId } = validated.data;

    const [article, existed] = await Promise.all([
      Articles.findById(articleId),
      ArticleDetails.findOne({ articleId }),
    ]);

    if (!article) throw new AppError("Không tìm thấy bài viết!", 404);
    if (existed) throw new AppError("Bài viết đã có nội dung chi tiết!", 400);

    const created = await ArticleDetails.create(validated.data);

    logger.info("ArticleDetails created", {
      articleId,
      by: req.user._id,
      name: req.user.username,
    });

    res.status(201).json(created);
  },
);

// ─── UPDATE ───────────────────────────────────────────────────────────────────
export const updateArticleDetails = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const id = validateObjectId(req.params.id);

    const validated = updateArticleDetailSchema.safeParse(req.body);
    if (!validated.success) {
      throw new AppError(formatZodError(validated.error), 400);
    }

    const updated = await ArticleDetails.findOneAndUpdate(
      { articleId: id },
      validated.data,
      { new: true, runValidators: true },
    )
      .populate("articleId")
      .populate("relatedArticles")
      .select("-__v");

    if (!updated) throw new AppError("Không tìm thấy bài viết!", 404);

    logger.info("ArticleDetails updated", {
      articleId: id,
      by: req.user?._id,
      name: req.user?.username,
    });

    res.status(200).json(updated);
  },
);

// ─── DELETE ───────────────────────────────────────────────────────────────────
export const deleteArticleDetails = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const id = validateObjectId(req.params.id);

    const deleted = await ArticleDetails.findOneAndDelete({ articleId: id });
    if (!deleted) throw new AppError("Không tìm thấy bài viết!", 404);

    logger.info("ArticleDetails deleted", {
      articleId: id,
      by: req.user?._id,
    });

    res.status(200).json({ message: "Xoá dữ liệu thành công!" });
  },
);
