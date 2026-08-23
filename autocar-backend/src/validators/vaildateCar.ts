import { createCarSchema, updateCarSchema } from "../schemas/car.schema";
import { validateWithSchema } from "../utils/validateWithSchema";

export const validateCreateCarData = (data: unknown) =>
  validateWithSchema(createCarSchema, data);

export const validateUpdateCarData = (data: unknown) =>
  validateWithSchema(updateCarSchema, data);
