import type { Request, Response } from "express";
import { ArticleDetails } from "../models/articleDetails.model";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
import logger from "../utils/logger";
import type { AuthRequest } from "../middleware/authMiddleware";

// ─── GET ALL — public ─────────────────────────────────────────────────────────
export const getAllArticleDetails = catchAsync(
  async (req: Request, res: Response) => {
    const articleDetails = await ArticleDetails.find()
      .populate("manager.managerId", "username email avatar")
      .select("-__v");

    res.status(200).json(articleDetails);
  },
);

// ─── GET BY ID — public ───────────────────────────────────────────────────────
export const getArticleDetailsById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const articleDetail = await ArticleDetails.findOne({ id })
      .populate("manager.managerId", "username email avatar")
      .select("-__v");

    if (!articleDetail) throw new AppError("Không tìm thấy bài viết!", 404);

    res.status(200).json(articleDetail);
  },
);

// ─── CREATE ───────────────────────────────────────
export const createArticleDetails = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new AppError("Unauthorized!", 401);

    const newArticleDetails = await ArticleDetails.create({
      ...req.body,
      manager: {
        managerId: req.user.id,
        managerName: req.user.username ?? req.user.username,
      },
    });

    logger.info("ArticleDetails created", {
      articleId: newArticleDetails.id,
      by: req.user.id,
    });
    res.status(201).json(newArticleDetails);
  },
);

// ─── UPDATE ───────────────────────────────────────
export const updateArticleDetails = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const updatedArticleDetails = await ArticleDetails.findOneAndUpdate(
      { id },
      req.body,
      { new: true, runValidators: true },
    ).select("-__v");

    if (!updatedArticleDetails) {
      throw new AppError("Không tìm thấy bài viết!", 404);
    }

    logger.info("ArticleDetails updated", { articleId: id, by: req.user?.id });
    res.status(200).json(updatedArticleDetails);
  },
);

// ─── DELETE ───────────────────────────────────────
export const deleteArticleDetails = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const deletedArticleDetails = await ArticleDetails.findOneAndDelete({ id });
    if (!deletedArticleDetails) {
      throw new AppError("Không tìm thấy bài viết!", 404);
    }

    logger.info("ArticleDetails deleted", { articleId: id, by: req.user?.id });
    res.status(200).json({ message: "Xoá dữ liệu thành công!" });
  },
);
