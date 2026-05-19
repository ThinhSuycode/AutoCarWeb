import mongoose from "mongoose";

const ArticleDetailSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    sections: [
      {
        type: {
          type: String, // ví dụ: "text", "image"
          required: true,
        },

        content: {
          type: mongoose.Schema.Types.Mixed,
          // cho phép string hoặc array
        },

        imageUrl: {
          type: String,
        },

        caption: {
          type: String,
        },
      },
    ],

    tags: [String],

    relatedArticles: [String],

    manager: {
      managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },

      managerName: {
        type: String,
        default: null,
      },
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
