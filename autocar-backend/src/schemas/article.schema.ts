import { z } from "zod";
import { ARTICLE_CATEGORY_VALUES } from "../constants/articleCategory";

export const ARTICLE_STATUS = [
  "draft",
  "pending",
  "published",
  "archived",
] as const;

export const articleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Tiêu đề phải có ít nhất 5 ký tự")
    .max(200, "Tiêu đề tối đa 200 ký tự"),

  slug: z
    .string()
    .trim()
    .min(3, "Slug tối thiểu 3 ký tự")
    .regex(/^[a-z0-9-]+$/, "Slug chỉ được chứa chữ thường, số và dấu '-'"),

  excerpt: z
    .string()
    .trim()
    .min(10, "Mô tả ngắn tối thiểu 10 ký tự")
    .max(300, "Mô tả ngắn tối đa 300 ký tự"),

  category: z.enum(ARTICLE_CATEGORY_VALUES),

  thumbnail: z.string().trim().url("Thumbnail không hợp lệ"),

  readTime: z.string().default("5 phút"),

  status: z.enum(ARTICLE_STATUS).default("draft"),

  publishedAt: z.coerce.date().optional(),
});

export const updateArticleSchema = articleSchema.partial();

export const articleQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),

  limit: z.coerce.number().min(1).max(100).default(10),

  sort: z
    .enum([
      "createdAt",
      "updatedAt",
      "title",
      "category",
      "status",
      "views",
      "likes",
    ])
    .default("createdAt"),

  order: z.enum(["asc", "desc"]).default("desc"),

  search: z.string().trim().optional(),

  category: z.enum(ARTICLE_CATEGORY_VALUES).optional(),

  status: z.enum(ARTICLE_STATUS).optional(),

  all: z.enum(["true", "false"]).optional(),
});
export const updateStatusArticleSchema = z.object({
  status: z.enum(ARTICLE_STATUS),
});

export type ArticleInput = z.infer<typeof articleSchema>;
export type ArticleStatusType = (typeof ARTICLE_STATUS)[number];
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
export type UpdateStatusArticle = z.infer<typeof updateStatusArticleSchema>;
export type ArticleQuery = z.infer<typeof articleQuerySchema>;
