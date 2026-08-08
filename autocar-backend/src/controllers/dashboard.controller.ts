import type { Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware";
import { catchAsync } from "../utils/catchAsync";
import { dashboardService } from "../services/dashboard.service";

export const getDashboardStats = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const data = await dashboardService.getDashboardStats();
    return res.status(200).json({
      success: true,
      data,
    });
  },
);
