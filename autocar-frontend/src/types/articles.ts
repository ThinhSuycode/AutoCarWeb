export interface Manager {
  managerId: string;
  managerName: string;
}
export type ArticleStatus = "draft" | "pending" | "published" | "archived";

export interface Articles {
  _id: string;

  title: string;

  excerpt: string;

  category: string;

  image: string;

  readTime: string;

  status: "draft" | "pending" | "published" | "archived";

  manager: Manager;

  createdAt?: Date | undefined;
}
export interface ArticleDetail {
  articleId: Articles;
  sections: ArticleSection[];
  tags: string[];
  relatedArticles: Articles[];
}
export interface ArticleSection {
  sectionType: string;
  content: string | string[];
  imageUrl?: string;
  caption?: string;
}

export interface FilterArticleType {
  id: number;
  nameVI: string;
  nameEN: string;
  color: string;
  bgColor: string;
}

export interface ArticleResponse {
  data: Articles[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface UpdateArticleDetailDto {
  sections: ArticleSection[];
  tags: string[];
  relatedArticles: Articles[];
}
export interface CreateArticleDetailDto extends UpdateArticleDetailDto {
  articleId: Articles;
}

export interface FormArticleType {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  status: string;
}
export interface ArticleDetailForm {
  sections: ArticleSection[];
  tags: string[];
  relatedArticles: Articles[];
}
