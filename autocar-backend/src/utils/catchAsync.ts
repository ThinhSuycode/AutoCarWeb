import type { Request, Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/authMiddleware";

type AsyncHandler = (
  req: Request | AuthRequest,
  res: Response,
  next: NextFunction,
) => Promise<any>;

export const catchAsync = (fn: AsyncHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
