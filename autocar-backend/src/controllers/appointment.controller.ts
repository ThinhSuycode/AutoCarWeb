import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
import { Contact } from "../models/contact.model";
import { Appointment } from "../models/appoinment.model";
import mongoose from "mongoose";
import { validateCreateAppointment } from "../validators/validateAppointment";
import { exportAppointmentExcel } from "../services/appointment.service";

export const getAllAppointment = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const {
      page = "1",
      limit = "10",
      search = "",
      status = "all",
      sort = "date_desc",
    } = req.query;

    const currentPage = Number(page);
    const pageSize = Number(limit);
    const skip = (currentPage - 1) * pageSize;

    const query: Record<string, any> = {};

    if (status !== "all") {
      query.status = status;
    }

    let sortOption: Record<string, 1 | -1> = {
      appointmentDate: -1,
    };

    switch (sort) {
      case "date_asc":
        sortOption = {
          appointmentDate: 1,
        };
        break;

      case "created_desc":
        sortOption = {
          createdAt: -1,
        };
        break;

      case "created_asc":
        sortOption = {
          createdAt: 1,
        };
        break;

      default:
        sortOption = {
          appointmentDate: -1,
        };
    }

    const appointments = await Appointment.find(query)
      .populate({
        path: "contactId",
        populate: [
          {
            path: "buyerId",
            select: "username email phone",
            match: search
              ? {
                  username: {
                    $regex: search,
                    $options: "i",
                  },
                }
              : {},
          },
          {
            path: "managerId",
            select: "username email",
          },
          {
            path: "carId",
            select: "name brand year thumbnail price",
          },
        ],
      })
      .populate("appointmentCar", "name brand thumbnail price color year")
      .populate("createdBy", "username email")
      .populate("confirmedBy", "username email")
      .populate("completedBy", "username email")
      .populate("cancelledBy", "username email")
      .sort(sortOption);

    const filterAppointments = appointments.filter(
      (item: any) => item.contactId?.buyerId,
    );

    const total = filterAppointments.length;

    const data = filterAppointments.slice(skip, skip + pageSize);

    return res.json({
      success: true,
      data,
      pagination: {
        page: currentPage,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  },
);

export const getMyAppointment = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const buyerId = req.user?._id;
    const contacts = await Contact.find({
      buyerId,
    }).select("_id");

    const contactIds = contacts.map((item) => item.id);

    const appointments = await Appointment.find({
      contactId: { $in: contactIds },
    })
      .populate({
        path: "contactId",
        populate: [
          {
            path: "carId",
            select: "name brand thumbnail price",
          },
          {
            path: "buyerId",
            select: "username email",
          },
          {
            path: "managerId",
            select: "username email phone",
          },
        ],
      })
      .populate("appointmentCar", "name brand thumbnail price color year")
      .populate("orderId")
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

export const getAppointmentDetail = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
      throw new AppError("ID lịch hẹn không hợp lệ", 400);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("ID lịch hẹn không hợp lệ", 400);
    }

    const appointment = await Appointment.findOne({
      contactId: id,
    })
      .populate({
        path: "contactId",
        populate: [
          {
            path: "buyerId",
            select: "username email phone address",
          },
          {
            path: "managerId",
            select: "username email phone",
          },
          {
            path: "carId",
            select: "name brand price year color thumbnail",
          },
        ],
      })
      .populate("appointmentCar", "name brand thumbnail price color year")
      .populate("orderId")
      .populate("createdBy", "username email");

    return res.status(200).json({
      success: true,
      data: appointment,
    });
  },
);

export const createAppointment = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { contactId } = req.params;

    if (typeof contactId !== "string") {
      throw new AppError("ID contact không hợp lệ", 400);
    }

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      throw new AppError("ID contact không hợp lệ", 400);
    }

    const validateAppointment = validateCreateAppointment(req.body);

    const {
      appointmentType,
      appointmentDate,
      appointmentCar,
      appointmentTime,
      showroom,
      note,
    } = validateAppointment;

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
      return res.status(400).json({
        success: false,
        message: "Người dùng này đã có lịch hẹn!",
      });
    }
    const carId = contact.carId || appointmentCar;

    const appointment = await Appointment.create({
      contactId,
      appointmentType,
      appointmentCar: carId,
      appointmentDate,
      appointmentTime,
      showroom,
      note,
      createdBy: req.user?._id,
    });

    contact.status = "appointment_created";

    contact.timeline.push({
      action: "CREATE_APPOINTMENT",
      note: `Tạo lịch hẹn tại ${showroom}`,
      userId: req.user?._id,
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

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      throw new AppError("Không tìm thấy lịch hẹn", 404);
    }

    appointment.status = "confirmed";
    appointment.confirmedBy = new mongoose.Types.ObjectId(req.user?._id);
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
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      throw new AppError("Không tìm thấy lịch hẹn", 404);
    }

    appointment.status = "completed";
    appointment.completedBy = new mongoose.Types.ObjectId(req.user?._id);
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

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      throw new AppError("Không tìm thấy lịch hẹn", 404);
    }

    appointment.status = "cancelled";
    appointment.cancelledBy = new mongoose.Types.ObjectId(req.user?._id);
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

export const deleteAppointment = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
      throw new AppError("ID lịch hẹn không hợp lệ", 400);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("ID lịch hẹn không hợp lệ", 400);
    }

    const appointment = await Appointment.findOne({
      contactId: id,
    });

    if (!appointment) {
      throw new AppError("Không tìm thấy lịch hẹn", 404);
    }

    await appointment.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Xóa lịch hẹn thành công",
    });
  },
);

export const exportAppointments = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const workbook = await exportAppointmentExcel({
      appointmentId: req.query.appointmentId as string,
      search: String(req.query.search ?? ""),
      status: String(req.query.status ?? "all"),
      sort: String(req.query.sort ?? "date_desc"),
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=appointments-${Date.now()}.xlsx`,
    );

    await workbook.xlsx.write(res);

    res.end();
  },
);
