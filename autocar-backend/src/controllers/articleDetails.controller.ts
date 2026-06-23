import type { Request, Response } from "express";
import mongoose from "mongoose";

import { ArticleDetails } from "../models/articleDetails.model";

import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
import logger from "../utils/logger";

import type { AuthRequest } from "../middleware/authMiddleware";
import { Articles } from "../models/articles.model";

// ───────────────── GET ALL ─────────────────
export const getAllArticleDetails = catchAsync(
  async (req: Request, res: Response) => {
    const articleDetails = await ArticleDetails.find()
      .populate("articleId")
      .populate("relatedArticles")
      .select("-__v");

    res.status(200).json(articleDetails);
  },
);

// ───────────────── GET BY ARTICLE ID ─────────────────
export const getArticleDetailsById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== "string") {
      throw new AppError("ID không hợp lệ!", 400);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("ID không hợp lệ!", 400);
    }

    const articleDetail = await ArticleDetails.findOne({
      articleId: id,
    })
      .populate("articleId")
      .populate("relatedArticles")
      .select("-__v");

    if (!articleDetail) {
      return res.status(200).json(null);
    }

    res.status(200).json(articleDetail);
  },
);

// ───────────────── CREATE ─────────────────
export const createArticleDetails = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized!", 401);
    }

    const { articleId } = req.body;

    if (!articleId) {
      throw new AppError("Không lấy được articleId!", 404);
    }
    const article = await Articles.findById(articleId);

    if (!article) {
      throw new AppError("Không tìm thấy bài viết!", 404);
    }
    const existed = await ArticleDetails.findOne({
      articleId: req.body.articleId,
    });

    if (existed) {
      throw new AppError("Bài viết đã có nội dung chi tiết!", 400);
    }
    const newArticleDetails = await ArticleDetails.create(req.body);

    res.status(201).json(newArticleDetails);
  },
);
// ───────────────── UPDATE ─────────────────
export const updateArticleDetails = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
      throw new AppError("ID không hợp lệ!", 400);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("ID không hợp lệ!", 400);
    }

    const updatedArticleDetails = await ArticleDetails.findOneAndUpdate(
      {
        articleId: id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    )
      .populate("articleId")
      .populate("relatedArticles")
      .select("-__v");

    if (!updatedArticleDetails) {
      throw new AppError("Không tìm thấy bài viết!", 404);
    }

    logger.info("ArticleDetails updated", {
      articleId: id,
      by: req.user?._id,
      name: req.user?.username,
    });

    res.status(200).json(updatedArticleDetails);
  },
);

// ───────────────── DELETE ─────────────────
export const deleteArticleDetails = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    if (typeof id !== "string") {
      throw new AppError("ID không hợp lệ!", 400);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("ID không hợp lệ!", 400);
    }

    const deletedArticleDetails = await ArticleDetails.findOneAndDelete({
      articleId: id,
    });

    if (!deletedArticleDetails) {
      throw new AppError("Không tìm thấy bài viết!", 404);
    }

    logger.info("ArticleDetails deleted", {
      articleId: id,
      by: req.user?._id,
    });

    res.status(200).json({
      message: "Xoá dữ liệu thành công!",
    });
  },
);
