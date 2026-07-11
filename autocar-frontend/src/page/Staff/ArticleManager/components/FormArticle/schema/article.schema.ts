import { z } from "zod";
import { ARTICLE_CATEGORY_VALUES } from "../../../../../../constants/articleData";

export const ARTICLE_STATUS = [
  "draft",
  "pending",
  "published",
  "archived",
] as const;

export const articleFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Tiêu đề phải có ít nhất 5 ký tự")
    .max(200, "Tiêu đề tối đa 200 ký tự"),

  slug: z
    .string()
    .trim()
    .min(3, "Slug tối thiểu 3 ký tự")
    .max(200)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug chỉ gồm chữ thường, số và dấu '-'",
    ),

  excerpt: z
    .string()
    .trim()
    .min(10, "Mô tả tối thiểu 10 ký tự")
    .max(300, "Mô tả tối đa 300 ký tự"),

  thumbnail: z.string().trim().url("Thumbnail phải là URL hợp lệ"),

  category: z.enum(ARTICLE_CATEGORY_VALUES, {
    error: "Vui lòng chọn danh mục",
  }),

  readTime: z
    .string()
    .trim()
    .min(2, "Thời gian đọc không hợp lệ")
    .default("5 phút"),

  status: z.enum(ARTICLE_STATUS).default("draft"),
});

export type ArticleFormInput = z.input<typeof articleFormSchema>;
export type ArticleFormOutput = z.output<typeof articleFormSchema>;
