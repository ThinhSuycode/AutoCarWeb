import type { Response } from "express";

import type { AuthRequest } from "../middleware/authMiddleware";

import { catchAsync } from "../utils/catchAsync";

import { orderService } from "../services/order.service";
import {
  validateCreateOrder,
  validateUpdateOrder,
  validateUpdateOrderStatus,
} from "../validators/validateOrder";
import mongoose from "mongoose";
import { AppError } from "../utils/AppError";
import { Appointment } from "../models/appoinment.model";
import logger from "../utils/logger";
import { validateObjectId } from "../utils/validateObjectId";

export const createOrder = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const validateCreate = validateCreateOrder(req.body);
    let staffId = req.user?._id;
    if (validateCreate.appointmentId) {
      const appointment = await Appointment.findById(
        validateCreate.appointmentId,
      ).populate("contactId");
      if (!appointment) {
        throw new AppError("Không tìm thấy lịch hẹn", 404);
      }
      const contact = appointment.contactId as any;
      if (!contact.managerId) {
        throw new AppError("Lịch hẹn chưa có nhân viên phụ trách", 400);
      }

      staffId = contact.managerId._id.toString();
    }
    if (!staffId) {
      throw new AppError("Không xác định được nhân viên", 400);
    }

    const order = await orderService.create(validateCreate, staffId);

    logger.info("Order created", { orderCode: order.orderCode });

    return res.status(201).json({
      success: true,
      message: "Tạo đơn hàng thành công.",
      data: order,
    });
  },
);

export const getOrders = catchAsync(async (req: AuthRequest, res: Response) => {
  const page = Number(req.query.page) || 1;

  const limit = Number(req.query.limit) || 10;

  const status = req.query.status as string;

  const result = await orderService.getAll(page, limit, status);

  return res.status(200).json({
    success: true,
    ...result,
  });
});

export const getOrderDetail = catchAsync(
  async (req: AuthRequest, res: Response) => {
     const id = validateObjectId(req.params.id);
    const order = await orderService.getById(id);

    return res.status(200).json({
      success: true,
      data: order,
    });
  },
);

export const updateOrder = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;

    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("ID không hợp lệ", 400);
    }

    const validateUpdate = validateUpdateOrder(req.body);

    const order = await orderService.update(id, validateUpdate);

    return res.status(200).json({
      success: true,
      message: "Cập nhật đơn hàng thành công.",
      data: order,
    });
  },
);
export const updateOrderStatus = catchAsync(
  async (req: AuthRequest, res: Response) => {
  const id = validateObjectId(req.params.id);
    const data = validateUpdateOrderStatus(req.body);

    const order = await orderService.updateStatus(id, data);

    return res.status(200).json({
      success: true,
      message: "Cập nhật trạng thái đơn hàng thành công.",
      data: order,
    });
  },
);
export const deleteOrder = catchAsync(
  async (req: AuthRequest, res: Response) => {
  const id = validateObjectId(req.params.id);
    await orderService.delete(id);

    return res.status(200).json({
      success: true,
      message: "Xóa đơn hàng thành công.",
    });
  },
);

export const updateStatusConfirm = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const id = validateObjectId(req.params.id);

    const order = await orderService.confirmOrder(id, req.user?._id ?? "");

    return res.status(200).json({
      success: true,
      message: "Xác nhận đơn hàng thành công!!",
      data: order,
    });
  },
);
