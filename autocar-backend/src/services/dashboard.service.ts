import { Appointment } from "../models/appoinment.model";
import { Articles } from "../models/articles.model";
import { Car } from "../models/car.model";
import { User } from "../models/user.model";

export const dashboardService = {
  getDashboardStats: async () => {
    const now = new Date();

    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    const sevenDaysAgo = new Date(now);

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

      appointmentStatusStats,
      carBrandStats,
      newUsersStats,
      revenueStats,
    ] = await Promise.all([
      // ===========================
      // COUNTS
      // ===========================

      Car.countDocuments(),

      User.countDocuments({ role: "user" }),

      User.countDocuments({ role: "staff" }),

      Articles.countDocuments(),

      Appointment.countDocuments(),

      Appointment.countDocuments({
        status: "pending",
      }),

      // ===========================
      // RECENT APPOINTMENTS
      // ===========================

      Appointment.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate({
          path: "contactId",
          select: "buyerId",
          populate: {
            path: "buyerId",
            select: "avatar username email phone",
          },
        })
        .select("-__v")
        .lean(),

      // ===========================
      // RECENT USERS
      // ===========================

      User.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("-password -__v")
        .lean(),

      // ===========================
      // APPOINTMENT STATUS
      // ===========================

      Appointment.aggregate([
        {
          $group: {
            _id: "$status",
            value: {
              $sum: 1,
            },
          },
        },
      ]),

      // ===========================
      // CAR BRAND
      // ===========================

      Car.aggregate([
        {
          $group: {
            _id: "$brand",
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
      ]),

      // ===========================
      // NEW USERS (7 DAYS)
      // ===========================

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
            users: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]),

      // ===========================
      // REVENUE (6 MONTHS)
      // ===========================

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
              month: {
                $month: "$createdAt",
              },
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
    return {
      totalCars,
      totalUsers,
      totalStaff,
      totalArticles,
      totalAppointments,
      pendingAppointments,

      recentAppointments,
      recentUsers,

      appointmentStatusStats,
      carBrandStats,
      newUsersStats,
      revenueStats,
    };
  },
};
