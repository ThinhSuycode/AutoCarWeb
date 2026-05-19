export interface Manager {
  managerId: string;
  managerName: string;
}

export interface Articles {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  manager: Manager;
}
export interface ArticleDetail {
  id: string;
  sections: ArticleSection[];
  tags: string[];
  relatedArticles: string[];
  manager: Manager;
}
export interface ArticleSection {
  type: string;
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
