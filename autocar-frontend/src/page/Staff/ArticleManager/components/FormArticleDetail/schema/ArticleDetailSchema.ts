import { z } from "zod";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "ID không hợp lệ");

// ─── Section schemas ──────────────────────────────────────────────────────────
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

// list: input là string (textarea), output là string[]
const listSchema = z
  .object({
    sectionType: z.literal("list"),
    content: z.string().min(1, "Danh sách không được để trống"),
  })
  .transform((s) => ({
    ...s,
    content: s.content
      .split("\n")
      .map((i) => i.trim())
      .filter(Boolean),
  }));

const videoSchema = z.object({
  sectionType: z.literal("video"),
  imageUrl: z.string().url("URL video không hợp lệ"),
  title: z.string().optional(),
  caption: z.string().optional(),
});

const codeSchema = z.object({
  sectionType: z.literal("code"),
  content: z.string().min(1, "Nội dung code không được để trống"),
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

const tagsSchema = z
  .string()
  .default("")
  .transform((v) =>
    v
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  );

// ─── Root schema ──────────────────────────────────────────────────────────────
export const articleDetailSchema = z.object({
  articleId: objectId,
  sections: z.array(sectionSchema).min(1, "Cần ít nhất 1 section"),
  tags: tagsSchema,
  relatedArticles: z.array(objectId).default([]),
});

export const updateArticleDetailSchema = articleDetailSchema.partial();

// ─── Exported types ───────────────────────────────────────────────────────────
export type ArticleDetailInput = z.input<typeof articleDetailSchema>;
export type ArticleDetailOutput = z.output<typeof articleDetailSchema>;
export type UpdateArticleDetailInput = z.infer<
  typeof updateArticleDetailSchema
>;
export type SectionInput = z.input<typeof sectionSchema>;
export type SectionOutput = z.output<typeof sectionSchema>;
