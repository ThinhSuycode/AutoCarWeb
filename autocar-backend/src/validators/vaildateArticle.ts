import { validateWithSchema } from "../utils/validateWithSchema";
import {
  articleSchema,
  updateArticleSchema,
  updateStatusArticleSchema,
} from "../schemas/article.schema";

export const validateCreateArticle = (data: unknown) =>
  validateWithSchema(articleSchema, data);

export const validateUpdateArticle = (data: unknown) =>
  validateWithSchema(updateArticleSchema, data);

export const validateUpdateStatusArticle = (data: unknown) =>
  validateWithSchema(updateStatusArticleSchema, data);
