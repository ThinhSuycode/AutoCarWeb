// ─── toFormInput ──────────────────────────────────────────────────────────────
// Convert dữ liệu ArticleDetail từ API → ArticleDetailFormInput (cho form Zod).
// API trả về: tags: string[], content: string | string[]
// Form (zod) cần: tags: string, content: string (textarea hiển thị được)

import type { Articles } from "../../../../types/articles";
import type { ArticleDetailFormInput } from "../components/FormArticleDetail/schema/ArticleDetailSchema";

interface ArticleDetailLike {
  sections?: {
    sectionType: string;
    content: string | string[];
    imageUrl?: string;
    caption?: string;
  }[];
  tags?: string[];
  relatedArticles?: Articles[];
}

export const toFormInput = (
  articleDetail: ArticleDetailLike | null | undefined,
): ArticleDetailFormInput => ({
  sections: articleDetail?.sections?.map((s) => ({
    ...s,
    // ép sectionType từ `string` (API) → union literal mà schema yêu cầu
    sectionType:
      s.sectionType as ArticleDetailFormInput["sections"][number]["sectionType"],
    content: Array.isArray(s.content)
      ? s.content.join("\n")
      : (s.content ?? ""),
  })) ?? [{ sectionType: "paragraph", content: "" }],
  tags: (articleDetail?.tags ?? []).join(", "),
  relatedArticles: articleDetail?.relatedArticles ?? [],
});
