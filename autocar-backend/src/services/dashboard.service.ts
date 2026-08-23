import { Appointment } from "../models/appoinment.model";
import { Articles } from "../models/articles.model";
import { Car } from "../models/car.model";
import { User } from "../models/user.model";
import { Order } from "../models/order.model";
import { Contact } from "../models/contact.model";
import {
  endOfToday,
  startOfThisMonth,
  startOfToday,
} from "../constants/dashboardData";

export const dashboardService = {
  getAdminDashboardStats: async () => {
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
      // REVENUE (6 MONTHS) — đổi sang Order, lấy totalAmount
      // ===========================

      Order.aggregate([
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
              $sum: "$totalAmount",
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
  getStaffDashboardStats: async (staffId: string) => {
    const [
      assignedCars,
      activeContacts,
      todayAppointmentsRaw,
      monthlyOrdersAgg,

      newContactsList,
      pendingInspectionList,

      carsByManagerStatus,
      contactsByStatus,

      recentOrders,
    ] = await Promise.all([
      Car.countDocuments({ managerId: staffId }),

      Contact.countDocuments({
        managerId: staffId,
        status: { $nin: ["completed", "cancelled"] },
      }),

      // Lịch hẹn hôm nay của các contact do staff này phụ trách
      Appointment.find({
        appointmentDate: { $gte: startOfToday(), $lte: endOfToday() },
      })
        .populate({
          path: "contactId",
          match: { managerId: staffId },
          select: "buyerId managerId",
          populate: { path: "buyerId", select: "username phone" },
        })
        .populate("appointmentCar", "name brand thumbnail")
        .sort({ appointmentTime: 1 })
        .lean(),

      // Doanh số + số đơn tháng này của staff
      Order.aggregate([
        {
          $match: {
            staffId,
            status: "completed",
            createdAt: { $gte: startOfThisMonth() },
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$totalAmount" },
            totalOrders: { $sum: 1 },
          },
        },
      ]),

      // Liên hệ mới chưa xử lý
      Contact.find({ managerId: staffId, status: "new" })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name phone carName createdAt")
        .lean(),

      // Xe đang chờ / mới tiếp nhận để kiểm định
      Car.find({
        managerId: staffId,
        managerStatus: { $in: ["pending", "received"] },
      })
        .sort({ updatedAt: -1 })
        .limit(5)
        .select("name brand thumbnail managerStatus")
        .lean(),

      // Breakdown xe theo từng bước kiểm định
      Car.aggregate([
        { $match: { managerId: staffId } },
        { $group: { _id: "$managerStatus", count: { $sum: 1 } } },
      ]),

      // Breakdown khách hàng theo từng bước xử lý (funnel)
      Contact.aggregate([
        { $match: { managerId: staffId } },
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),

      // Đơn hàng gần nhất của staff
      Order.find({ staffId })
        .sort({ createdAt: -1 })
        .limit(5)
        .select(
          "orderCode carSnapshot buyerSnapshot totalAmount status createdAt",
        )
        .lean(),
    ]);

    const todayAppointments = todayAppointmentsRaw.filter(
      (item: any) => item.contactId,
    );

    return {
      assignedCars,
      activeContacts,
      todayAppointments: todayAppointments.length,
      monthlyOrders: monthlyOrdersAgg[0]?.totalOrders ?? 0,
      monthlyRevenue: monthlyOrdersAgg[0]?.totalRevenue ?? 0,

      todayAppointmentsList: todayAppointments,
      newContactsList,
      pendingInspectionList,

      carsByManagerStatus,
      contactsByStatus,

      recentOrders,
    };
  },
};
