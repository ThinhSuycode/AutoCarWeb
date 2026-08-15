import mongoose from "mongoose";
import { Order } from "../models/order.model";
import { Payment } from "../models/payment.model";
import { AppError } from "../utils/AppError";
import {
  canChangePaymentStatus,
  createTransactionCode,
} from "../constants/paymentStatus";
import {
  CreatePaymentDto,
  CreatePaymentInput,
  PaymentQuery,
  UpdateStatusPayment,
} from "../schemas/payment.schema";

export const paymentService = {
  async createPayment(input: CreatePaymentInput, staff: string) {
    if (!staff) {
      throw new AppError("Không tìm thấy người tạo!!", 401);
    }

    const { orderId } = input;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      throw new AppError("Mã đơn hàng không hợp lệ!!", 400);
    }

    const order = await Order.findById(orderId);
    if (!order) {
      throw new AppError("Không tìm thấy hoá đơn", 404);
    }

    const transactionCode = createTransactionCode(input.method);

    const paymentPayload: CreatePaymentDto = {
      ...input,
      transactionCode,
      createdBy: staff,
    };

    const paymentOrder = await Payment.create(paymentPayload);

    return paymentOrder;
  },

  async getPaymentById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Mã ID không hợp lệ!!", 400);
    }

    const payment = await Payment.findById(id)
      .populate({ path: "orderId" })
      .populate({ path: "createdBy", select: "-password" });

    if (!payment) {
      throw new AppError("Không tìm thấy giao dịch thanh toán", 404);
    }

    return payment;
  },

  async getAllPayments(query: PaymentQuery) {
    const { page, limit, orderId, status, method } = query;

    const filter: Record<string, unknown> = {};

    if (orderId) {
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        throw new AppError("Mã đơn hàng không hợp lệ!!", 400);
      }
      filter.orderId = orderId;
    }
    if (status) filter.status = status;
    if (method) filter.method = method;

    const skip = (page - 1) * limit;

    const [payments, total] = await Promise.all([
      Payment.find(filter)
        .populate({ path: "orderId" })
        .populate({ path: "createdBy", select: "-password" })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Payment.countDocuments(filter),
    ]);

    return {
      payments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async updatePaymentStatus(id: string, data: UpdateStatusPayment) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Mã ID không hợp lệ!!", 400);
    }

    const payment = await Payment.findById(id);

    if (!payment) {
      throw new AppError("Không tìm thấy giao dịch thanh toán", 404);
    }

    const order = await Order.findById(payment.orderId);

    if (!order) {
      throw new AppError("Không tìm thấy hoá đơn thanh toán", 404);
    }

    const currentStatus = payment.status;

    const nextStatus = data.status;

    if (!canChangePaymentStatus(currentStatus, nextStatus)) {
      throw new AppError(
        `Không thể chuyển trạng thái thanh toán từ "${currentStatus}" sang "${nextStatus}".`,
        400,
      );
    }

    payment.status = nextStatus;

    if (nextStatus === "completed") {
      payment.paidAt = new Date();
      order.paidAmount += payment.amount;
      order.remainingAmount -= payment.amount;
    }

    if (nextStatus === "pending") {
      payment.paidAt = undefined;
    }

    await payment.save();
    await order.save();

    return payment;
  },
};
