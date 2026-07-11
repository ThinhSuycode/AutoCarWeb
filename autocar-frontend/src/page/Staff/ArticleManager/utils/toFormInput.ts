import type { ArticleDetail, ArticleSection } from "../../../../types/articles";

import type {
  ArticleDetailInput,
  SectionInput,
} from "../components/FormArticleDetail/schema/ArticleDetailSchema";

// ================= Helpers =================

const toTextArea = (content?: string | string[]) =>
  Array.isArray(content) ? content.join("\n") : (content ?? "");

const tagsToInput = (tags?: string[]) => tags?.join(", ") ?? "";

// ================= Section Mapper =================

const sectionToFormInput = (section: ArticleSection): SectionInput => {
  switch (section.sectionType) {
    case "paragraph":
      return {
        sectionType: "paragraph",
        content: toTextArea(section.content),
      };

    case "heading":
      return {
        sectionType: "heading",
        title: section.title ?? "",
      };

    case "image":
      return {
        sectionType: "image",
        imageUrl: section.imageUrl ?? "",
        alt: section.alt ?? "",
        caption: section.caption ?? "",
      };

    case "quote":
      return {
        sectionType: "quote",
        content: toTextArea(section.content),
        caption: section.caption ?? "",
      };

    case "list":
      return {
        sectionType: "list",
        content: toTextArea(section.content),
      };

    case "video":
      return {
        sectionType: "video",
        imageUrl: section.imageUrl ?? "",
        title: section.title ?? "",
        caption: section.caption ?? "",
      };

    case "code":
      return {
        sectionType: "code",
        content: toTextArea(section.content),
        title: section.title ?? "",
      };

    default:
      return {
        sectionType: "paragraph",
        content: "",
      };
  }
};

// ================= Main Mapper =================

export const toFormInput = (
  articleDetail?: ArticleDetail | null,
): ArticleDetailInput => ({
  articleId: articleDetail?.articleId?._id ?? "",

  sections: articleDetail?.sections.map(sectionToFormInput) ?? [
    {
      sectionType: "paragraph",
      content: "",
    },
  ],

  tags: tagsToInput(articleDetail?.tags),

  relatedArticles: articleDetail?.relatedArticles.map((item) => item._id) ?? [],
});
