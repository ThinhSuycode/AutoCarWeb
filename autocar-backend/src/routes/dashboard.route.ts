import { Router } from "express";
import { getDashboardStats } from "../controllers/dashboard.controller";
import { requireAuth, requireRole } from "../middleware/authMiddleware";

const router = Router();

// Chỉ admin mới truy cập được
router.get("/stats", requireAuth, requireRole("admin"), getDashboardStats);

export default router;
