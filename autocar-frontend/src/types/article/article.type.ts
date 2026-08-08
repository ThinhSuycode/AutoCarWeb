import type { ArticleCategory, ArticleStatus } from "./article.constants";

export interface Manager {
  managerId: string;

  managerName: string;
}

export interface ArticleTimeline {
  action: string;

  note: string;

  userId: string;

  createdAt: string;
}

export interface Article {
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
