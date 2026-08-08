import express from "express";
import {
  deleteCarDetail,
  getAllCarDetail,
  createCarDetail,
  updateCarDetail,
  getCarDetailById,
} from "../controllers/carDetail.controller";
import { requireAuth, requireRole } from "../middleware/authMiddleware";

export const carDetailRouter = express.Router();

carDetailRouter.get("/carDetail", getAllCarDetail);
carDetailRouter.get("/carDetail/:id", getCarDetailById);

carDetailRouter.post(
  "/carDetail",
  requireAuth,
  requireRole("admin"),
  createCarDetail,
);

carDetailRouter.put(
  "/carDetail/:id",
  requireAuth,
  requireRole("admin"),
  updateCarDetail,
);

carDetailRouter.patch(
  "/carDetail/:id",
  requireAuth,
  requireRole("admin"),
  updateCarDetail,
);

carDetailRouter.delete(
  "/carDetail/:id",
  requireAuth,
  requireRole("admin"),
  deleteCarDetail,
);
