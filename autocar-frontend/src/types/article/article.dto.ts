import type {
  ArticleCategory,
  ArticleStatus,
  ReadingLevel,
} from "./article.constants";

import type {
  ArticleSection,
  Attachment,
  Reference,
  Seo,
} from "./article-detail.type";

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
