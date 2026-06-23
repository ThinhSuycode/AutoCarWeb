import mongoose from "mongoose";

const ArticleDetailSchema = new mongoose.Schema(
  {
    articleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Articles",
      required: true,
    },

    sections: [
      {
        sectionType: {
          type: String,
          required: true,
        },

        content: mongoose.Schema.Types.Mixed,

        imageUrl: String,

        caption: String,
      },
    ],

    tags: [String],

    relatedArticles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Articles",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const ArticleDetails = mongoose.model(
  "ArticleDetails",
  ArticleDetailSchema,
);
