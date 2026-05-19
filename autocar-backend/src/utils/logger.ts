// src/utils/logger.ts
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : "";
  return `${timestamp} [${level.toUpperCase()}]: ${stack || message} ${metaStr}`;
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "warn" : "debug",

  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    logFormat,
  ),

  transports: [
    // Console — chỉ khi development
    ...(process.env.NODE_ENV !== "production"
      ? [
          new winston.transports.Console({
            format: combine(colorize(), logFormat),
          }),
        ]
      : []),

    // Lưu file lỗi — rotate hàng ngày, giữ 14 ngày
    new DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      level: "error",
      maxFiles: "14d",
    }),

    // Lưu tất cả log — giữ 7 ngày
    new DailyRotateFile({
      filename: "logs/combined-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "7d",
    }),
  ],
});

export default logger;
