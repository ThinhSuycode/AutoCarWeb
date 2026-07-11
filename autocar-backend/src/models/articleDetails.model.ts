import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema(
  {
    sectionType: {
      type: String,
      enum: ["heading", "paragraph", "image", "quote", "list", "video", "code"],
      required: true,
    },

    title: String,

    content: mongoose.Schema.Types.Mixed,

    imageUrl: String,

    caption: String,

    alt: String,
  },
  {
    _id: false,
  },
);

const ArticleDetailSchema = new mongoose.Schema(
  {
    articleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Articles",
      required: true,
      unique: true,
    },

    // Nội dung bài viết
    sections: [SectionSchema],

    // SEO
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
      canonicalUrl: String,
    },

    // Tag
    tags: [
      {
        type: String,
      },
    ],

    // Bài viết liên quan
    relatedArticles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Articles",
      },
    ],

    // Nguồn tham khảo
    references: [
      {
        title: String,
        url: String,
      },
    ],

    // File đính kèm
    attachments: [
      {
        name: String,
        url: String,
      },
    ],

    // Thông tin bổ sung
    readingLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    language: {
      type: String,
      default: "vi",
    },

    allowComment: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const ArticleDetails = mongoose.model(
  "ArticleDetails",
  ArticleDetailSchema,
);
