import {
  articleDetailSchema,
  updateArticleDetailSchema,
} from "../schemas/articleDetail.schema";
import { validateWithSchema } from "../utils/validateWithSchema";

export const validatedCreateArticleDetail = (data: unknown) =>
  validateWithSchema(articleDetailSchema, data);

export const validatedUpdateArticleDetail = (data: unknown) =>
  validateWithSchema(updateArticleDetailSchema, data);
