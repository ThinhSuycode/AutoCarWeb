import { createCarSchema, updateCarSchema } from "../schemas/car.schema";
import {
  createCarDetailSchema,
  updateCarDetailSchema,
} from "../schemas/carDetail.schema";
import { validateWithSchema } from "../utils/validateWithSchema";

export const validateCreateCarDetail = (data: unknown) =>
  validateWithSchema(createCarDetailSchema, data);

export const validateUpdateCarDetail = (data: unknown) =>
  validateWithSchema(updateCarDetailSchema, data);
