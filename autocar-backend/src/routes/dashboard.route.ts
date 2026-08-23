import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/authMiddleware";
import {
  getAdminDashboardStats,
  getStaffDashboardStats,
} from "../controllers/dashboard.controller";

const router = Router();

router.get(
  "/admin/dashboard/stats",
  requireAuth,
  requireRole("admin"),
  getAdminDashboardStats,
);
router.get(
  "/staff/dashboard/stats",
  requireAuth,
  requireRole("staff"),
  getStaffDashboardStats,
);

export default router;
