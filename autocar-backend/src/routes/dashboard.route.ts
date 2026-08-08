import { Router } from "express";
import { getDashboardStats } from "../controllers/dashboard.controller";
import { requireAuth, requireRole } from "../middleware/authMiddleware";

const router = Router();

router.get(
  "/admin/dashboard/stats",
  requireAuth,
  requireRole("admin"),
  getDashboardStats,
);

export default router;
