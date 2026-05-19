import mongoose from "mongoose";

const ArticlesSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: String,
    excerpt: String,
    category: String,
    image: String,
    date: String,
    readTime: String,
    manager: {
      managerId: {
        type: String,
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
