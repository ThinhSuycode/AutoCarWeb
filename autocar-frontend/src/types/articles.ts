import type { ArticleCategory } from "../constants/articleData";

// ───────────────── Manager ─────────────────
export interface Manager {
  managerId: string;
  managerName: string;
}

// ───────────────── Article ─────────────────
export type ArticleStatus = "draft" | "pending" | "published" | "archived";

export interface ArticleTimeline {
  action: string;
  note: string;
  userId: string;
  createdAt: string;
}

export interface Articles {
  _id: string;

  title: string;
  slug: string;
  excerpt: string;
  category: ArticleCategory;
  thumbnail: string;
  readTime: string;

  status: ArticleStatus;
  publishedAt?: string;

  views: number;
  likes: number;

  manager: Manager;

  timeline: ArticleTimeline[];

  createdAt: string;
  updatedAt: string;
}

// ───────────────── Article Detail ─────────────────
export type SectionType =
  | "heading"
  | "paragraph"
  | "image"
  | "quote"
  | "list"
  | "video"
  | "code";

export interface ArticleSection {
  sectionType: SectionType;

  title?: string;

  content?: string | string[];

  imageUrl?: string;

  caption?: string;

  alt?: string;
}

export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
}

export interface Reference {
  title: string;
  url: string;
}

export interface Attachment {
  name: string;
  url: string;
}

export type ReadingLevel = "beginner" | "intermediate" | "advanced";

export interface ArticleDetail {
  _id: string;

  articleId: Articles;

  sections: ArticleSection[];

  seo?: Seo;

  tags: string[];

  relatedArticles: Articles[];

  references?: Reference[];

  attachments?: Attachment[];

  readingLevel?: ReadingLevel;

  language?: string;

  allowComment?: boolean;

  isFeatured?: boolean;

  createdAt: string;

  updatedAt: string;
}

// ───────────────── Response ─────────────────
export interface ArticleResponse {
  data: Articles[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
export interface ArticleObjectResponse {
  data: Articles;

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ───────────────── DTO ─────────────────
export interface CreateArticleDto {
  title: string;
  slug: string;
  excerpt: string;
  category: ArticleCategory;
  thumbnail: string;
  readTime: string;
  status: ArticleStatus;
}

export interface UpdateArticleDto extends Partial<CreateArticleDto> {
  publishedAt?: string;
}

export interface CreateArticleDetailDto {
  articleId: string;

  sections: ArticleSection[];

  seo?: Seo;

  tags: string[];

  relatedArticles: string[];

  references?: Reference[];

  attachments?: Attachment[];

  readingLevel?: ReadingLevel;

  language?: string;

  allowComment?: boolean;

  isFeatured?: boolean;
}

export interface UpdateArticleDetailDto extends Partial<CreateArticleDetailDto> {}

// ───────────────── Form ─────────────────
export interface FormArticleType {
  title: string;
  slug: string;
  excerpt: string;
  category: ArticleCategory;
  thumbnail: string;
  readTime: string;
  status: ArticleStatus;
}

export interface ArticleDetailForm {
  sections: ArticleSection[];

  seo: Seo;

  tags: string[];

  relatedArticles: string[];

  references: Reference[];

  attachments: Attachment[];

  readingLevel: ReadingLevel;

  language: string;

  allowComment: boolean;

  isFeatured: boolean;
}
