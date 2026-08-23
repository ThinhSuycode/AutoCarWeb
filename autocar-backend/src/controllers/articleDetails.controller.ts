import type { Request, Response } from "express";
import type { ZodError } from "zod";

import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
import logger from "../utils/logger";
import type { AuthRequest } from "../middleware/authMiddleware";
import {
  articleDetailSchema,
  updateArticleDetailSchema,
} from "../schemas/articleDetail.schema";
import { validateObjectId } from "../utils/validateObjectId";
import { articleDetailsService } from "../services/articleDetail.service";
import { validatedCreateArticleDetail } from "../validators/validateArticleDetail";

const formatZodError = (error: ZodError): string =>
  error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(" | ");

export const getAllArticleDetails = catchAsync(
  async (_req: Request, res: Response) => {
    const data = await articleDetailsService.getAll();
    res.status(200).json(data);
  },
);

export const getArticleDetailsById = catchAsync(
  async (req: Request, res: Response) => {
    const id = validateObjectId(req.params.id);

    const data = await articleDetailsService.getByArticleId(id);
    res.status(200).json(data ?? null);
  },
);

export const createArticleDetails = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new AppError("Unauthorized!", 401);

    const validated = validatedCreateArticleDetail(req.body);

    const created = await articleDetailsService.create(validated);

    logger.info("ArticleDetails created", {
      articleId: validated.articleId,
      by: req.user._id,
      name: req.user.username,
    });

    res.status(201).json(created);
  },
);

export const updateArticleDetails = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const id = validateObjectId(req.params.id);

    const validated = validatedCreateArticleDetail(req.body);
    const updated = await articleDetailsService.updateByArticleId(
      id,
      validated,
    );

    logger.info("ArticleDetails updated", {
      articleId: id,
      by: req.user?._id,
      name: req.user?.username,
    });

    res.status(200).json(updated);
  },
);

export const deleteArticleDetails = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const id = validateObjectId(req.params.id);

    await articleDetailsService.deleteByArticleId(id);

    logger.info("ArticleDetails deleted", {
      articleId: id,
      by: req.user?._id,
    });

    res.status(200).json({ message: "Xoá dữ liệu thành công!" });
  },
);
