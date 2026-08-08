import type { Request, Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/authMiddleware";

type AsyncHandler = (
  req: Request | AuthRequest,
  res: Response,
  next: NextFunction,
) => Promise<any>;

export const catchAsync = (fn: AsyncHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.error("❌ BACKEND ERROR:");
      console.error(error);
      next(error);
    }
  };
};
