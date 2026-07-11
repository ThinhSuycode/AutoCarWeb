import mongoose from "mongoose";
import {
  ARTICLE_CATEGORIES,
  ARTICLE_CATEGORY_VALUES,
} from "../constants/articleCategory";

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
      enum: ["draft", "pending", "published", "archived"],
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

export const Articles = mongoose.model("Articles", ArticleSchema);
