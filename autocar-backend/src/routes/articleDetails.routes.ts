import express from "express";
import {
  createArticleDetails,
  deleteArticleDetails,
  getAllArticleDetails,
  updateArticleDetails,
} from "../controllers/articleDetails.controller";

export const articleDetailRouter = express.Router();

articleDetailRouter.get("/articleDetails", getAllArticleDetails);
articleDetailRouter.post("/articleDetails", createArticleDetails);
articleDetailRouter.put("/articleDetails/:id", updateArticleDetails);
articleDetailRouter.patch("/articleDetails/:id", updateArticleDetails);
articleDetailRouter.delete("/articleDetails/:id", deleteArticleDetails);
