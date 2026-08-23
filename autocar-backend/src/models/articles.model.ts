import mongoose from "mongoose";
import { ARTICLE_CATEGORY_VALUES } from "../constants/articleCategory";
import { ARTICLE_STATUS } from "../schemas/article.schema";

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    excerpt: {
      type: String,
      required: true,
      maxlength: 300,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: ARTICLE_CATEGORY_VALUES,
      trim: true,
      index: true,
    },

    thumbnail: {
      type: String,
      required: true,
      trim: true,
    },

    readTime: {
      type: String,
      default: "5 phút",
    },

    publishedAt: Date,

    status: {
      type: String,
      enum: ARTICLE_STATUS,
      default: "draft",
    },

    views: {
      type: Number,
      default: 0,
    },

    likes: {
      type: Number,
      default: 0,
    },

    manager: {
      managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      managerName: {
        type: String,
      },
    },

    timeline: [
      {
        action: {
          type: String,
          enum: ["CREATE", "UPDATE", "DELETE", "SUBMIT", "PUBLISH", "ARCHIVE"],
          required: true,
        },

        note: {
          type: String,
          default: "",
        },

        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

ArticleSchema.index({ createdAt: -1 });

export const Articles = mongoose.model("Articles", ArticleSchema);
