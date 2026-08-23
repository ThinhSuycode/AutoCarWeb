import mongoose from "mongoose";
import { AppError } from "./AppError";

export const validateObjectId = (id: unknown, message = "ID không hợp lệ") => {
  if (typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(message, 400);
  }
  return id;
};
