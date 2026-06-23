import { AppError } from "./AppError";

import { carSchema, updateCarSchema } from "../schemas/car.schema";

export const validateCreateCarData = (data: unknown) => {
  const result = carSchema.safeParse(data);

  if (!result.success) {
    throw new AppError(result.error.issues[0].message, 400);
  }

  return result.data;
};

export const validateUpdateCarData = (data: unknown) => {
  const result = updateCarSchema.safeParse(data);

  if (!result.success) {
    throw new AppError(result.error.issues[0].message, 400);
  }

  return result.data;
};
