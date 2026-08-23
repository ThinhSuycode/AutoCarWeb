import type { Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware";
import { catchAsync } from "../utils/catchAsync";
import { dashboardService } from "../services/dashboard.service";
import { AppError } from "../utils/AppError";

export const getAdminDashboardStats = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const stats = await dashboardService.getAdminDashboardStats();
    const {
      appointmentStatusStats,
      carBrandStats,
      newUsersStats,
      revenueStats,
      ...rest
    } = stats;

    res.status(200).json({
      success: true,
      data: {
        ...rest,
        charts: {
          appointmentStatusStats,
          carBrandStats,
          newUsersStats,
          revenueStats,
        },
      },
    });
  },
);

export const getStaffDashboardStats = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new AppError("Unauthorized", 401);
    const stats = await dashboardService.getStaffDashboardStats(
      req.user._id.toString(),
    );
    res.status(200).json({ success: true, data: stats });
  },
);
