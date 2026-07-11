import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
import { Contact } from "../models/contact.model";
import { Appointment } from "../models/appoinment.model";
import mongoose from "mongoose";
import { validateCreateAppointment } from "../utils/validateAppointment";

export const getAppointmentsAll = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const appointments = await Appointment.find()
      .populate({
        path: "contactId",
        populate: [
          {
            path: "buyerId",
            select: "username email phone",
          },
          {
            path: "managerId",
            select: "username email",
          },
        ],
      })
      .populate("createdBy", "username email")
      .sort({
        appointmentDate: -1,
      });

    res.json({
      success: true,
      data: appointments,
    });
  },
);

export const createAppointment = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const { contactId } = req.params;

    if (typeof contactId !== "string") {
      throw new AppError("ID contact không hợp lệ", 400);
    }

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      throw new AppError("ID contact không hợp lệ", 400);
    }

    const validateAppointment = validateCreateAppointment(req.body);

    const { appointmentDate, appointmentTime, showroom, note } =
      validateAppointment;

    const contact = await Contact.findById(contactId);

    if (!contact) {
      throw new AppError("Không tìm thấy contact", 404);
    }

    const existed = await Appointment.findOne({
      contactId,
      status: {
        $in: ["pending", "confirmed"],
      },
    });

    if (existed) {
      throw new AppError("Contact đã có lịch hẹn", 400);
    }

    const appointment = await Appointment.create({
      contactId,
      appointmentDate,
      appointmentTime,
      showroom,
      note,
      createdBy: req.user._id,
    });

    contact.status = "appointment_created";

    contact.timeline.push({
      action: "CREATE_APPOINTMENT",
      note: `Tạo lịch hẹn tại ${showroom}`,
      userId: req.user._id,
    });

    await contact.save();

    return res.status(201).json({
      success: true,
      message: "Tạo lịch hẹn thành công",
      data: appointment,
    });
  },
);

export const confirmAppointment = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
      throw new AppError("Kiểu dữ liệu ID không hợp lệ!!", 401);
    }
    if (mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Kiểu dữ liệu ID không hợp lệ!!", 401);
    }

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      throw new AppError("Không tìm thấy lịch hẹn", 404);
    }

    appointment.status = "confirmed";
    appointment.confirmedAt = new Date();

    await appointment.save();

    return res.json({
      success: true,
      message: "Xác nhận lịch hẹn thành công",
    });
  },
);

export const completeAppointment = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
      throw new AppError("Kiểu dữ liệu ID không hợp lệ!!", 401);
    }
    if (mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Kiểu dữ liệu ID không hợp lệ!!", 401);
    }

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      throw new AppError("Không tìm thấy lịch hẹn", 404);
    }

    appointment.status = "completed";
    appointment.completedAt = new Date();

    await appointment.save();

    const contact = await Contact.findById(appointment.contactId);

    if (contact) {
      contact.status = "completed";

      contact.timeline.push({
        action: "COMPLETE_APPOINTMENT",
        note: "Khách đã đến showroom",
        userId: req.user?._id,
      });

      await contact.save();
    }

    return res.json({
      success: true,
      message: "Hoàn thành lịch hẹn thành công",
    });
  },
);

export const cancelAppointment = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
      throw new AppError("Kiểu dữ liệu ID không hợp lệ!!", 401);
    }
    if (mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Kiểu dữ liệu ID không hợp lệ!!", 401);
    }

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      throw new AppError("Không tìm thấy lịch hẹn", 404);
    }

    appointment.status = "cancelled";
    appointment.cancelledAt = new Date();

    await appointment.save();

    const contact = await Contact.findById(appointment.contactId);

    if (contact) {
      contact.status = "cancelled";

      contact.timeline.push({
        action: "CANCEL_APPOINTMENT",
        note: "Lịch hẹn bị hủy",
        userId: req.user?._id,
      });

      await contact.save();
    }

    return res.json({
      success: true,
      message: "Hủy lịch hẹn thành công",
    });
  },
);
