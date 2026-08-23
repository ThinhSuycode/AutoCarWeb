import { z } from "zod";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "ID không hợp lệ");
const paragraphSchema = z.object({
  sectionType: z.literal("paragraph"),
  content: z.string().min(1, "Nội dung không được để trống"),
});

const headingSchema = z.object({
  sectionType: z.literal("heading"),
  title: z.string().min(1, "Tiêu đề không được để trống"),
});

const imageSchema = z.object({
  sectionType: z.literal("image"),
  imageUrl: z.string().url("URL hình ảnh không hợp lệ"),
  alt: z.string().optional(),
  caption: z.string().optional(),
});

const quoteSchema = z.object({
  sectionType: z.literal("quote"),
  content: z.string().min(1, "Nội dung trích dẫn không được để trống"),
  caption: z.string().optional(),
});

const listSchema = z.object({
  sectionType: z.literal("list"),
  content: z.array(z.string().min(1)).min(1, "Danh sách phải có ít nhất 1 mục"),
});

const videoSchema = z.object({
  sectionType: z.literal("video"),
  imageUrl: z.string().url("URL video không hợp lệ"),
  title: z.string().optional(),
  caption: z.string().optional(),
});

const codeSchema = z.object({
  sectionType: z.literal("code"),
  content: z.string().min(1, "Code không được để trống"),
  title: z.string().optional(),
});

export const sectionSchema = z.discriminatedUnion("sectionType", [
  paragraphSchema,
  headingSchema,
  imageSchema,
  quoteSchema,
  listSchema,
  videoSchema,
  codeSchema,
]);

const seoSchema = z.object({
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  keywords: z.array(z.string()).default([]),
  canonicalUrl: z.string().url().optional(),
});

export const articleDetailSchema = z.object({
  articleId: objectId,
  sections: z.array(sectionSchema).min(1, "Bài viết phải có ít nhất 1 section"),
  tags: z.array(z.string()).default([]),
  relatedArticles: z.array(objectId).default([]),
  seo: seoSchema.optional(),
});

export const updateArticleDetailSchema = articleDetailSchema
  .omit({ articleId: true })
  .partial();

export type ArticleDetailInput = z.input<typeof articleDetailSchema>;
export type ArticleDetailOutput = z.output<typeof articleDetailSchema>;
export type UpdateArticleDetailInput = z.input<
  typeof updateArticleDetailSchema
>;
export type SectionInput = z.input<typeof sectionSchema>;
export type SectionOutput = z.output<typeof sectionSchema>;
