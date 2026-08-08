import type { ApiListResponse, ApiResponse } from "../common/response";

import type { Article } from "./article.type";
import type { ArticleDetail } from "./article-detail.type";

export type ArticleListResponse = ApiListResponse<Article>;

export type ArticleResponse = ApiResponse<Article>;

export type ArticleDetailResponse = ApiResponse<ArticleDetail>;
