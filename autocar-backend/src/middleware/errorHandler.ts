import type { Request, Response, NextFunction } from "express";
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
  const message = isAppError ? err.message : "Lỗi server!";

  // Chỉ log lỗi không dự đoán được (bug thật, không phải 400/404)
  if (!isAppError) {
    logger.error("Unexpected error", {
      message: err.message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
      user: (req as any).user?.id ?? "guest",
    });
  }

  res.status(statusCode).json({
    success: false,
    message,
    // Chỉ trả stack khi dev — không lộ thông tin nhạy cảm ở production
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
