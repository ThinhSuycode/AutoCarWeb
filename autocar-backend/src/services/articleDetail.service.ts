import { ArticleDetails } from "../models/articleDetails.model";
import { Articles } from "../models/articles.model";
import { AppError } from "../utils/AppError";

const POPULATE_FIELDS = ["articleId", "relatedArticles"] as const;

const withPopulate = (query: any) =>
  POPULATE_FIELDS.reduce((q, field) => q.populate(field), query).select("-__v");

export const articleDetailsService = {
  getAll: async () => {
    return withPopulate(ArticleDetails.find()).lean();
  },

  getByArticleId: async (articleId: string) => {
    return withPopulate(ArticleDetails.findOne({ articleId })).lean();
  },

  create: async (payload: Record<string, any>) => {
    const { articleId } = payload;

    const [article, existed] = await Promise.all([
      Articles.findById(articleId),
      ArticleDetails.findOne({ articleId }),
    ]);

    if (!article) throw new AppError("Không tìm thấy bài viết!", 404);
    if (existed) throw new AppError("Bài viết đã có nội dung chi tiết!", 400);

    return ArticleDetails.create(payload);
  },

  updateByArticleId: async (
    articleId: string,
    payload: Record<string, any>,
  ) => {
    const updated = await withPopulate(
      ArticleDetails.findOneAndUpdate({ articleId }, payload, {
        new: true,
        runValidators: true,
      }),
    );

    if (!updated) throw new AppError("Không tìm thấy bài viết!", 404);
    return updated;
  },

  deleteByArticleId: async (articleId: string) => {
    const deleted = await ArticleDetails.findOneAndDelete({ articleId });
    if (!deleted) throw new AppError("Không tìm thấy bài viết!", 404);
    return deleted;
  },
};
