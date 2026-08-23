import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
import { validateCreateAppointment } from "../validators/validateAppointment";
import { validateObjectId } from "../utils/validateObjectId";
import {
  appointmentService,
  exportAppointmentExcel,
} from "../services/appointment.service";

// ─── GET ALL (admin) ────────────────────────────────────────────────────────
export const getAllAppointment = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const result = await appointmentService.getAll(
      req.query as Record<string, string>,
    );

    return res.json({ success: true, ...result });
  },
);

// ─── GET MY APPOINTMENTS (buyer) ─────────────────────────────────────────────
export const getMyAppointment = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const appointments = await appointmentService.getMyAppointments(
      req.user?._id,
    );

    res.json({ success: true, data: appointments });
  },
);

// ─── GET DETAIL ───────────────────────────────────────────────────────────────
export const getAppointmentDetail = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const id = validateObjectId(req.params.id, "ID lịch hẹn không hợp lệ");

    const appointment = await appointmentService.getDetailByContactId(id);

    return res.status(200).json({ success: true, data: appointment });
  },
);

// ─── CREATE ─────────────────────────────────────────────────────────────────
export const createAppointment = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const contactId = validateObjectId(
      req.params.contactId,
      "ID contact không hợp lệ",
    );

    const validated = validateCreateAppointment(req.body);

    const result = await appointmentService.create(
      contactId,
      validated,
      req.user?._id,
    );

    if (result.conflict) {
      return res.status(400).json({
        success: false,
        message: "Người dùng này đã có lịch hẹn!",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Tạo lịch hẹn thành công",
      data: result.appointment,
    });
  },
);

// ─── CONFIRM ────────────────────────────────────────────────────────────────
export const confirmAppointment = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const id = validateObjectId(req.params.id);
    await appointmentService.confirm(id, req.user?._id);

    return res.json({ success: true, message: "Xác nhận lịch hẹn thành công" });
  },
);

// ─── COMPLETE ───────────────────────────────────────────────────────────────
export const completeAppointment = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const id = validateObjectId(req.params.id);
    await appointmentService.updateStatus({
      id,
      status: "completed",
      actorField: "completedBy",
      timelineAction: "COMPLETE_APPOINTMENT",
      timelineNote: "Khách đã đến showroom",
      contactStatus: "completed",
      userId: req.user?._id,
    });

    return res.json({
      success: true,
      message: "Hoàn thành lịch hẹn thành công",
    });
  },
);

// ─── CANCEL ─────────────────────────────────────────────────────────────────
export const cancelAppointment = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const id = validateObjectId(req.params.id);
    await appointmentService.updateStatus({
      id,
      status: "cancelled",
      actorField: "cancelledBy",
      timelineAction: "CANCEL_APPOINTMENT",
      timelineNote: "Lịch hẹn bị hủy",
      contactStatus: "cancelled",
      userId: req.user?._id,
    });

    return res.json({ success: true, message: "Hủy lịch hẹn thành công" });
  },
);

// ─── DELETE ─────────────────────────────────────────────────────────────────
export const deleteAppointment = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const id = validateObjectId(req.params.id, "ID lịch hẹn không hợp lệ");

    await appointmentService.deleteByContactId(id);

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
