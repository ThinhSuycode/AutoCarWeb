import type { ReadingLevel, SectionType } from "./article.constants";

import type { Article } from "./article.type";

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

export interface ArticleDetail {
  _id: string;

  articleId: Article;

  sections: ArticleSection[];

  seo?: Seo;

  tags: string[];

  relatedArticles: Article[];

  references?: Reference[];

  attachments?: Attachment[];

  readingLevel?: ReadingLevel;

  language?: string;

  allowComment?: boolean;

  isFeatured?: boolean;

  createdAt: string;

  updatedAt: string;
}
