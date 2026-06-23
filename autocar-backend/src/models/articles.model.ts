import mongoose from "mongoose";

const ArticlesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    excerpt: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      default: "",
    },

    readTime: {
      type: String,
      default: "5 phút",
    },

    status: {
      type: String,
      enum: ["draft", "pending", "published", "archived"],
      default: "draft",
    },

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

export const Articles = mongoose.model("Articles", ArticlesSchema);
