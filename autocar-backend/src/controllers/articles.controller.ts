import type { Request, Response } from "express";
import mongoose from "mongoose";

import { Articles } from "../models/articles.model";

import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
import logger from "../utils/logger";

import type { AuthRequest } from "../middleware/authMiddleware";
import { articleSchema, updateArticleSchema } from "../schemas/article.schema";

// ───────────────── GET ALL ─────────────────
export const getAllArticle = catchAsync(async (req: Request, res: Response) => {
  const {
    page = "1",
    limit = "10",
    sort = "createdAt",
    order = "desc",
    search,
    category,
    all,
    status,
  } = req.query as Record<string, string>;

  const query: Record<string, any> = {};

  if (category) query.category = category;

  if (search?.trim()) {
    query.$or = [
      { title: { $regex: search.trim(), $options: "i" } },
      { excerpt: { $regex: search.trim(), $options: "i" } },
    ];
  }

  if (status?.trim()) {
    query.status = status;
  }

  const sortOrder = order === "asc" ? 1 : -1;

  // GET ALL
  if (all === "true") {
    const articles = await Articles.find(query)
      .populate("manager.managerId", "username email avatar")
      .sort({ [sort]: sortOrder })
      .select("-__v");

    return res.status(200).json({
      data: articles,
      pagination: {
        page: 1,
        limit: articles.length,
        total: articles.length,
        totalPages: 1,
      },
    });
  }

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(100, Math.max(1, Number(limit)));

  const [articles, total] = await Promise.all([
    Articles.find(query)
      .populate("manager.managerId", "username email avatar")
      .sort({ [sort]: sortOrder })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .select("-__v"),

    Articles.countDocuments(query),
  ]);

  res.status(200).json({
    data: articles,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  });
});

// ───────────────── GET BY ID ─────────────────
export const getArticleById = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    if (typeof id !== "string") {
      throw new AppError("ID không hợp lệ!!", 400);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("ID không hợp lệ!", 400);
    }

    const article = await Articles.findById(id)
      .populate("manager.managerId", "username email avatar")
      .select("-__v");

    if (!article) {
      throw new AppError("Không tìm thấy bài viết!", 404);
    }

    res.status(200).json(article);
  },
);
export const createArticle = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const validated = articleSchema.safeParse(req.body);

    if (!validated.success) {
      throw new AppError(
        validated.error.issues[0]?.message ?? "Dữ liệu không hợp lệ",
        400,
      );
    }

    const article = await Articles.create({
      ...validated.data,

      manager: {
        managerId: req.user._id,
        managerName: req.user.username,
      },
      timeline: [
        {
          action: "CREATE",
          note: "Tạo bài viết",
          userId: req.user._id,
        },
      ],
    });

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
    const { id } = req.params;

    if (typeof id !== "string") {
      throw new AppError("ID không hợp lệ", 400);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("ID không hợp lệ", 400);
    }

    const validated = updateArticleSchema.safeParse(req.body);

    if (!validated.success) {
      throw new AppError(
        validated.error.issues[0]?.message ?? "Dữ liệu không hợp lệ",
        400,
      );
    }

    const article = await Articles.findByIdAndUpdate(id, validated.data, {
      new: true,
      runValidators: true,
    }).select("-__v");

    if (!article) {
      throw new AppError("Không tìm thấy bài viết", 404);
    }

    Object.assign(article, validated.data);

    article.timeline.push({
      action: "UPDATE",
      note: "Cập nhật bài viết",
      userId: req.user!._id,
    });

    await article.save();
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

// ───────────────── DELETE ─────────────────
export const deleteArticle = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    if (typeof id !== "string") {
      throw new AppError("ID không hợp lệ!", 400);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("ID không hợp lệ!", 400);
    }

    const artciles = await Articles.findByIdAndDelete(id);

    if (!artciles) {
      throw new AppError("Không tìm thấy bài viết!!", 404);
    }

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
