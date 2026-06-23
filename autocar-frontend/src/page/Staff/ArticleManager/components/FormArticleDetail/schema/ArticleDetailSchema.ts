import { z } from "zod";
import type { Articles } from "../../../../../../types/articles";

const sectionTypeEnum = z.enum([
  "paragraph",
  "heading",
  "image",
  "quote",
  "list",
]);

const baseSectionSchema = z.object({
  sectionType: sectionTypeEnum,
  imageUrl: z.string().optional(),
  caption: z.string().optional(),
});

const sectionSchema = baseSectionSchema
  .extend({
    content: z.string().default(""),
  })
  .transform((section) => {
    if (section.sectionType === "list") {
      return {
        ...section,
        content: section.content
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      };
    }
    return section;
  });

/** Input: "tag1, tag2" (string) → Output: string[] */
const tagsSchema = z
  .string()
  .default("")
  .transform((raw) =>
    raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  );

const articleRefSchema = z.custom<Articles>(() => true);

export const articleDetailFormSchema = z.object({
  sections: z.array(sectionSchema).min(1, "Cần ít nhất 1 section"),
  tags: tagsSchema,
  relatedArticles: z.array(articleRefSchema).default([]),
});

/** Type của giá trị TRONG FORM (trước transform) — dùng cho useForm<T>() */
export type ArticleDetailFormInput = z.input<typeof articleDetailFormSchema>;

/** Type SAU transform — dùng khi gửi API (onSubmit nhận type này) */
export type ArticleDetailFormOutput = z.output<typeof articleDetailFormSchema>;
