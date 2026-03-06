export interface ArticlesItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
}
export interface ArticleDetail {
  id: string;
  sections: ArticleSection[];
  tags: string[];
  relatedArticles: string[];
}
export interface ArticleSection {
  type: string;
  content: string | string[];
  imageUrl?: string;
  caption?: string;
}
