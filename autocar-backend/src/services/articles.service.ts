import { Articles } from "../models/articles.model";
import { ArticleStatusType } from "../schemas/article.schema";
import { AppError } from "../utils/AppError";

interface GetAllArticlesParams {
  page?: string;
  limit?: string;
  sort?: string;
  order?: string;
  search?: string;
  category?: string;
  all?: string;
  status?: string;
}

const buildQuery = ({
  category,
  search,
  status,
}: Pick<GetAllArticlesParams, "category" | "search" | "status">) => {
  const query: Record<string, any> = {};

  if (category) query.category = category;

  if (search?.trim()) {
    query.$or = [
      { title: { $regex: search.trim(), $options: "i" } },
      { excerpt: { $regex: search.trim(), $options: "i" } },
    ];
  }

  if (status?.trim()) query.status = status;

  return query;
};

const withManagerPopulate = (q: any) =>
  q.populate("manager.managerId", "username email avatar").select("-__v");

export const articlesService = {
  getAll: async (params: GetAllArticlesParams) => {
    const {
      page = "1",
      limit = "10",
      sort = "createdAt",
      order = "desc",
      all,
    } = params;

    const query = buildQuery(params);
    const sortOrder = order === "asc" ? 1 : -1;

    if (all === "true") {
      const articles = await withManagerPopulate(
        Articles.find(query).sort({ [sort]: sortOrder }),
      );

      return {
        data: articles,
        pagination: {
          page: 1,
          limit: articles.length,
          total: articles.length,
          totalPages: 1,
        },
      };
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));

    const [articles, total] = await Promise.all([
      withManagerPopulate(
        Articles.find(query)
          .sort({ [sort]: sortOrder })
          .skip((pageNum - 1) * limitNum)
          .limit(limitNum),
      ),
      Articles.countDocuments(query),
    ]);

    return {
      data: articles,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    };
  },

  getById: async (id: string) => {
    const article = await withManagerPopulate(Articles.findById(id));
    if (!article) throw new AppError("Không tìm thấy bài viết!", 404);
    return article;
  },

  create: async (
    payload: Record<string, any>,
    user: { _id: any; username: string },
  ) => {
    return Articles.create({
      ...payload,
      manager: {
        managerId: user._id,
        managerName: user.username,
      },
      timeline: [
        {
          action: "CREATE",
          note: "Tạo bài viết",
          userId: user._id,
        },
      ],
    });
  },

  update: async (id: string, payload: Record<string, any>, userId: string) => {
    const article = await Articles.findById(id).select("-__v");
    if (!article) throw new AppError("Không tìm thấy bài viết", 404);

    Object.assign(article, payload);
    article.timeline.push({
      action: "UPDATE",
      note: "Cập nhật bài viết",
      userId,
    });

    await article.save();
    return article;
  },

  updateStatus: async (
    id: string,
    status: ArticleStatusType,
    userId: string,
  ) => {
    const article = await Articles.findById(id);
    if (!article) throw new AppError("Không tìm thấy bài viết", 404);
    article.status = status;
    article.timeline.push({
      action: "UPDATE",
      note: "Cập nhật trạng thái bài viết",
      userId,
    });
    article.save();
  },

  delete: async (id: string) => {
    const article = await Articles.findByIdAndDelete(id);
    if (!article) throw new AppError("Không tìm thấy bài viết!!", 404);
    return article;
  },
};
