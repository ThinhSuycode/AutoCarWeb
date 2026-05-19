import { Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware";

import { Car } from "../models/car.model";
import { User } from "../models/user.model";
import { Appointment } from "../models/appoinment.model";
import { Articles } from "../models/articles.model";

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const now = new Date();

    // ─────────────────────────────────────────────
    // 6 THÁNG GẦN NHẤT
    // ─────────────────────────────────────────────

    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    // ─────────────────────────────────────────────
    // 7 NGÀY GẦN NHẤT
    // ─────────────────────────────────────────────

    const sevenDaysAgo = new Date();

    sevenDaysAgo.setDate(now.getDate() - 6);

    const [
      totalCars,
      totalUsers,
      totalStaff,
      totalArticles,
      totalAppointments,
      pendingAppointments,

      recentAppointments,
      recentUsers,

      // CHARTS
      appointmentStatusStats,
      carBrandStats,
      newUsersStats,
      revenueStats,
    ] = await Promise.all([
      // ─── COUNTS ─────────────────────

      Car.countDocuments(),

      User.countDocuments({ role: "user" }),

      User.countDocuments({ role: "staff" }),

      Articles.countDocuments(),

      Appointment.countDocuments(),

      Appointment.countDocuments({
        status: "pending",
      }),

      // ─── RECENT ─────────────────────

      Appointment.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("userId", "username email")
        .select("-__v"),

      User.find().sort({ createdAt: -1 }).limit(5).select("-password -__v"),

      // ────────────────────────────────
      // APPOINTMENT STATUS
      // ────────────────────────────────

      Appointment.aggregate([
        {
          $group: {
            _id: "$status",
            value: { $sum: 1 },
          },
        },
      ]),

      // ────────────────────────────────
      // CAR BRAND
      // ────────────────────────────────

      Car.aggregate([
        {
          $group: {
            _id: "$brand",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
      ]),

      // ────────────────────────────────
      // USERS 7 DAYS
      // ────────────────────────────────

      User.aggregate([
        {
          $match: {
            createdAt: {
              $gte: sevenDaysAgo,
            },
          },
        },
        {
          $group: {
            _id: {
              $dayOfWeek: "$createdAt",
            },
            users: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]),

      // ────────────────────────────────
      // REVENUE 6 MONTHS
      // ────────────────────────────────

      Appointment.aggregate([
        {
          $match: {
            createdAt: {
              $gte: sixMonthsAgo,
            },

            status: "completed",
          },
        },

        {
          $group: {
            _id: {
              month: { $month: "$createdAt" },
            },

            revenue: {
              $sum: "$price",
            },

            cars: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            "_id.month": 1,
          },
        },
      ]),
    ]);

    return res.status(200).json({
      success: true,

      data: {
        totalCars,
        totalUsers,
        totalStaff,
        totalArticles,
        totalAppointments,
        pendingAppointments,
        recentAppointments,
        recentUsers,

        charts: {
          appointmentStatusStats,
          carBrandStats,
          newUsersStats,
          revenueStats,
        },
      },
    });
  } catch (error) {
    console.error("getDashboardStats error:", error);

    return res.status(500).json({
      success: false,
      message: "Lỗi server!",
    });
  }
};
