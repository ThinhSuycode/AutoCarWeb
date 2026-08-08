import { AppError } from "../utils/AppError";
import {
  carDetailSchema,
  updateCarDetailSchema,
} from "../schemas/carDetail.schema";

export const validateCreateCarDetail = (data: unknown) => {
  const result = carDetailSchema.safeParse(data);

  if (!result.success) {
    const message = result.error.issues.map((err) => err.message).join(", ");

    throw new AppError(message, 400);
  }

  return result.data;
};

export const validateUpdateCarDetail = (data: unknown) => {
  const result = updateCarDetailSchema.safeParse(data);

  if (!result.success) {
    const message = result.error.issues.map((err) => err.message).join(", ");

    throw new AppError(message, 400);
  }

  return result.data;
};
