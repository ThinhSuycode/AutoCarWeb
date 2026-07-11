import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import logger from "../utils/logger";

export const globalErrorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isAppError = err instanceof AppError;

  const statusCode = isAppError ? err.statusCode : 500;

  const message = isAppError ? err.message : "Đã xảy ra lỗi hệ thống!";

  logger.error({
    statusCode,
    message,
    url: req.originalUrl,
    method: req.method,
    stack: err.stack,
  });

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};
