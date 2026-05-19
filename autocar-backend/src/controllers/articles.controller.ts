import type { Request, Response } from "express";
import { Articles } from "../models/articles.model";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
import logger from "../utils/logger";
import type { AuthRequest } from "../middleware/authMiddleware";

// ─── GET ALL — public ─────────────────────────────────────────────────────────
export const getAllArticle = catchAsync(async (req: Request, res: Response) => {
  const {
    page = "1",
    limit = "10",
    sort = "createdAt",
    order = "desc",
    search,
    category,
    all,
  } = req.query as Record<string, string>;

  const query: Record<string, any> = {};

  if (category) query.category = category;

  if (search?.trim()) {
    query.$or = [
      { title: { $regex: search.trim(), $options: "i" } },
      { excerpt: { $regex: search.trim(), $options: "i" } },
    ];
  }

  const sortOrder = order === "asc" ? 1 : -1;

  // Trả hết nếu all=true
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

// ─── CREATE — admin/staff → AuthRequest ───────────────────────────────────────
export const createArticle = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new AppError("Unauthorized!", 401);

    const article = new Articles({
      ...req.body,
      manager: {
        managerId: req.user.id,
        managerName: req.user.username,
      },
    });

    const newArticle = await article.save();

    logger.info("Article created", {
      articleId: newArticle.id,
      by: req.user.id,
    });
    res.status(201).json(newArticle);
  },
);

// ─── UPDATE — admin/staff → AuthRequest ───────────────────────────────────────
export const updateArticle = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const updatedArticle = await Articles.findOneAndUpdate({ id }, req.body, {
      new: true,
      runValidators: true,
    }).select("-__v");

    if (!updatedArticle) throw new AppError("Không tìm thấy bài viết!", 404);

    logger.info("Article updated", { articleId: id, by: req.user?.id });
    res.status(200).json(updatedArticle);
  },
);

// ─── DELETE — admin/staff → AuthRequest ───────────────────────────────────────
export const deleteArticle = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const deletedArticle = await Articles.findOneAndDelete({ id });
    if (!deletedArticle) throw new AppError("Không tìm thấy bài viết!", 404);

    logger.info("Article deleted", { articleId: id, by: req.user?.id });
    res.status(200).json({ message: "Xoá bài viết thành công!" });
  },
);
