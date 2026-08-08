import type { ArticleCategory } from "../../constants/articleData";

export type ArticleStatus = "draft" | "pending" | "published" | "archived";

export type ReadingLevel = "beginner" | "intermediate" | "advanced";

export type SectionType =
  | "heading"
  | "paragraph"
  | "image"
  | "quote"
  | "list"
  | "video"
  | "code";

export type { ArticleCategory };
