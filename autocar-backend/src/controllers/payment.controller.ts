import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { catchAsync } from "../utils/catchAsync";
import {
  validatedCreatePayment,
  validatedUpdateStatus,
} from "../validators/validatePayment";
import { paymentService } from "../services/payment.service";
import { AppError } from "../utils/AppError";
import { paymentQuerySchema } from "../schemas/payment.schema";
import { Payment } from "../models/payment.model";

export const createPaymentOrder = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const validatedPayment = validatedCreatePayment(req.body);

    const staff = req.user?._id?.toString() ?? "";

    const paymentOrder = await paymentService.createPayment(
      validatedPayment,
      staff,
    );

    return res.status(200).json({
      status: true,
      data: paymentOrder,
    });
  },
);

export const getPaymentDetail = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw new AppError("Thiếu ID giao dịch", 400);
    }
    if (id && typeof id !== "string") {
      throw new AppError("Kiểu Id không hợp lệ String", 400);
    }

    const payment = await paymentService.getPaymentById(id);

    return res.status(200).json({
      status: true,
      data: payment,
    });
  },
);

export const getAllPayments = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const parsedQuery = paymentQuerySchema.safeParse(req.query);

    if (!parsedQuery.success) {
      throw new AppError(parsedQuery.error.issues[0].message, 400);
    }

    const result = await paymentService.getAllPayments(parsedQuery.data);

    return res.status(200).json({
      status: true,
      data: result.payments,
      pagination: result.pagination,
    });
  },
);

export const updatePaymentStatus = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw new AppError("Thiếu ID giao dịch", 400);
    }
    if (id && typeof id !== "string") {
      throw new AppError("Kiểu Id không hợp lệ String", 400);
    }

    const validatedStatus = validatedUpdateStatus(req.body);

    const payment = await paymentService.updatePaymentStatus(
      id,
      validatedStatus,
    );

    return res.status(200).json({
      status: true,
      data: payment,
    });
  },
);

export const deletePaymentOrder = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw new AppError("Thiếu ID giao dịch", 400);
    }
    if (id && typeof id !== "string") {
      throw new AppError("Kiểu Id không hợp lệ String", 400);
    }

    await Payment.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      message: "Xoá thành công",
    });
  },
);
