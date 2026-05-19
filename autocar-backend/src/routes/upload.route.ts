import express from "express";
import { upload } from "../middleware/upload";

const uploadRouter = express.Router();

uploadRouter.post("/images", upload.array("images", 10), (req, res) => {
  const files = req.files as Express.Multer.File[];
  const urls = files.map((f: any) => f.path);
  res.json({ urls });
});

export default uploadRouter;
