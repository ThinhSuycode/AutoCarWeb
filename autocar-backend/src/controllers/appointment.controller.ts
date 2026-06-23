import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware";
import { Appointment } from "../models/appoinment.model";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
import logger from "../utils/logger";
import { toMinutes } from "../utils/time";
import {
  validateGuestInfo,
  validateNoConflict,
  validateRequiredFields,
  validateType,
} from "../validators/appointment.validator";

const VALID_STATUSES = ["pending", "confirmed", "completed", "cancelled"];
const VALID_TYPES = ["test_drive", "consultation", "maintenance", "inspection"];
const ACTIVE_STATUSES = ["pending", "confirmed"];
const BUFFER_MINUTES = 120; // 2 tiếng buffer giữa 2 lịch cùng xe

// ─── Helpers ──────────────────────────────────────────────────────────────────
const buildMissingFields = (fields: Record<string, any>) =>
  Object.entries(fields)
    .filter(([, val]) => !val)
    .map(([key]) => key)
    .join(", ");

// ─── CREATE — public (guest hoặc user đã đăng nhập) ──────────────────────────
export const createAppointment = catchAsync(
  async (req: Request, res: Response) => {
    const {
      type = "test_drive",
      name,
      phone,
      carId,
      carName,
      date,
      time,
      location,
      note,
      managerId,
      userId,
    } = req.body;

    // Validate — mỗi hàm tự throw nếu sai
    validateRequiredFields({ type, date, time, location });
    if (!userId) validateGuestInfo(name, phone);
    validateType(type);
    await validateNoConflict({ carId, userId, phone, date, time });

    const appointment = await Appointment.create({
      type,
      name: name || "",
      phone: phone || "",
      carId: carId || null,
      carName: carName || "",
      date,
      time,
      location,
      note: note || "",
      userId: userId || null,
      managerId: managerId || null,
      status: "pending",
    });

    logger.info("Appointment created", {
      appointmentId: appointment._id,
      carId,
      date,
      time,
      userId: userId || "guest",
    });

    res.status(201).json({
      success: true,
      message: "Đặt lịch hẹn thành công!",
      data: appointment,
    });
  },
);

// ─── GET ALL — phân quyền theo role ──────────────────────────────────────────
export const getAppointments = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new AppError("Unauthorized!", 401);

    const {
      status,
      type,
      page = "1",
      limit = "10",
      sort = "createdAt",
      order = "desc",
      all,
    } = req.query as Record<string, string>;

    const { _id: userId, role } = req.user;
    const sortOrder = order === "asc" ? 1 : -1;
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));

    const query: Record<string, any> = {};

    // Admin thấy tất cả, staff thấy xe mình quản lý, user thấy của mình
    if (role === "staff") query.managerId = userId;
    else if (role === "user") query.userId = userId;

    if (status && VALID_STATUSES.includes(status)) query.status = status;
    if (type && VALID_TYPES.includes(type)) query.type = type;

    const populateOptions = [
      { path: "userId", select: "username email phone avatar" },
      { path: "managerId", select: "username email staffInfo" },
      { path: "carId", select: "name image" },
    ];

    if (all === "true") {
      const appointments = await Appointment.find(query)
        .populate(populateOptions)
        .sort({ [sort]: sortOrder })
        .select("-__v");

      return res.status(200).json({
        success: true,
        data: appointments,
        pagination: {
          page: 1,
          limit: appointments.length,
          total: appointments.length,
          totalPages: 1,
        },
      });
    }

    const [appointments, total] = await Promise.all([
      Appointment.find(query)
        .populate(populateOptions)
        .sort({ [sort]: sortOrder })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .select("-__v"),
      Appointment.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: appointments,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  },
);

// ─── GET BY ID ────────────────────────────────────────────────────────────────
export const getAppointmentById = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new AppError("Unauthorized!", 401);

    const { id } = req.params;
    const { _id: userId, role } = req.user;

    const appointment = await Appointment.findById(id)
      .populate("userId", "username email phone")
      .populate("managerId", "username email staffInfo");

    if (!appointment) throw new AppError("Không tìm thấy lịch hẹn!", 404);

    const isOwner = appointment.userId?.equals(userId);
    const isManager = appointment.managerId?.equals(userId);
    const isAdmin = role === "admin";

    if (!isOwner && !isManager && !isAdmin) {
      throw new AppError("Không có quyền xem!", 403);
    }

    res.status(200).json({ success: true, data: appointment });
  },
);

// ─── UPDATE STATUS — staff/admin ─────────────────────────────────────────────
export const updateAppointmentStatus = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new AppError("Unauthorized!", 401);

    const { id } = req.params;
    const { status, note } = req.body;
    const { _id: userId, role } = req.user;

    if (!status || !VALID_STATUSES.includes(status)) {
      throw new AppError("Trạng thái không hợp lệ!", 400);
    }

    const appointment = await Appointment.findById(id);
    if (!appointment) throw new AppError("Không tìm thấy lịch hẹn!", 404);

    const isManager = appointment.managerId?.equals(userId);
    const isAdmin = role === "admin";

    if (!isManager && !isAdmin) {
      throw new AppError("Không có quyền cập nhật!", 403);
    }

    appointment.status = status;
    if (note) appointment.note = note;
    await appointment.save();

    logger.info("Appointment status updated", {
      appointmentId: id,
      status,
      by: userId,
    });

    res.status(200).json({
      success: true,
      message: "Cập nhật thành công!",
      data: appointment,
    });
  },
);

// ─── CANCEL — user tự huỷ lịch của mình ─────────────────────────────────────
export const cancelAppointment = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new AppError("Unauthorized!", 401);

    const { id } = req.params;
    const { _id: userId } = req.user;

    const appointment = await Appointment.findById(id);
    if (!appointment) throw new AppError("Không tìm thấy lịch hẹn!", 404);

    if (!appointment.userId?.equals(userId)) {
      throw new AppError("Không có quyền hủy!", 403);
    }

    if (appointment.status === "completed") {
      throw new AppError("Không thể hủy lịch đã hoàn thành!", 400);
    }

    appointment.status = "cancelled";
    await appointment.save();

    logger.info("Appointment cancelled", { appointmentId: id, by: userId });

    res.status(200).json({
      success: true,
      message: "Hủy lịch hẹn thành công!",
      data: appointment,
    });
  },
);

// ─── DELETE — admin only ──────────────────────────────────────────────────────
export const deleteAppointment = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) throw new AppError("Không tìm thấy lịch hẹn!", 404);

    logger.info("Appointment deleted", {
      appointmentId: id,
      by: req.user?._id,
    });

    res.status(200).json({ success: true, message: "Xóa thành công!" });
  },
);
