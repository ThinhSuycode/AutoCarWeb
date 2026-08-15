import { Car } from "../models/car.model";
import { Order } from "../models/order.model";
import { User } from "../models/user.model";
import {
  CreateOrderDto,
  UpdateOrderDto,
  UpdateOrderStatusDto,
} from "../schemas/order.schema";
import { AppError } from "../utils/AppError";
import { canChangeOrderStatus } from "../constants/orderStatus";
import { Appointment } from "../models/appoinment.model";

const generateOrderCode = () =>
  `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

const populateOrder = (query: any) =>
  query
    .populate("buyerId", "username avatar email phone")
    .populate("staffId", "username")
    .populate("carId", "name brand thumbnail year price")
    .populate("appointmentId");

export const orderService = {
  async create(data: CreateOrderDto, staffId: string) {
    const [buyer, car] = await Promise.all([
      User.findById(data.buyerId),
      Car.findById(data.carId),
    ]);

    if (!buyer) {
      throw new AppError("Khách hàng không tồn tại", 404);
    }

    if (!car) {
      throw new AppError("Xe không tồn tại", 404);
    }

    if (car.status !== "available") {
      throw new AppError("Xe hiện không thể bán", 400);
    }
    const unitPrice = car.price;

    const discount = data.discount ?? 0;

    if (discount > unitPrice) {
      throw new AppError("Giảm giá không được lớn hơn giá niêm yết", 400);
    }

    const salePrice = unitPrice - discount;

    const taxRate = data.taxRate ?? 10;

    const tax = salePrice * (taxRate / 100);

    const totalAmount = salePrice + tax;

    const order = await Order.create({
      ...data,

      staffId,

      orderCode: generateOrderCode(),

      quantity: 1,

      unitPrice,

      discount,

      salePrice,

      taxRate,

      tax,

      totalAmount,

      remainingAmount: totalAmount,

      buyerSnapshot: {
        username: buyer.username ?? "",
        email: buyer.email,
        phone: buyer.phone,
      },

      carSnapshot: {
        name: car.name,
        brand: car.brand,
        color: car.color,
        year: car.year,
      },
    });

    await Car.findByIdAndUpdate(car._id, {
      status: "reserved",
      orderId: order._id,
    });

    if (order.appointmentId) {
      await Appointment.findByIdAndUpdate(order.appointmentId, {
        orderId: order._id,
      });
    }

    return populateOrder(Order.findById(order._id));
  },

  // ==========================
  // GET ALL
  // ==========================
  async getAll(page = 1, limit = 10, status?: string) {
    const filter: Record<string, unknown> = {};

    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      populateOrder(
        Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      ).lean(),

      Order.countDocuments(filter),
    ]);

    return {
      data: orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  // ==========================
  // GET DETAIL
  // ==========================
  async getById(id: string) {
    const order = await populateOrder(Order.findOne({ appointmentId: id }));

    if (!order) {
      throw new AppError("Đơn hàng không tồn tại", 404);
    }

    return order;
  },

  // ==========================
  // UPDATE INFO
  // ==========================
  async update(id: string, data: UpdateOrderDto) {
    const current = await Order.findById(id);

    if (!current) {
      throw new AppError("Đơn hàng không tồn tại", 404);
    }
    const unitPrice = current.unitPrice;

    const discount = data.discount ?? current.discount;

    if (discount > unitPrice) {
      throw new AppError("Giảm giá không được lớn hơn giá niêm yết", 400);
    }

    const salePrice = unitPrice - discount;

    const taxRate = data.taxRate ?? current.taxRate;

    const tax = salePrice * (taxRate / 100);

    const totalAmount = salePrice + tax;

    const order = await populateOrder(
      Order.findByIdAndUpdate(
        id,
        {
          ...data,

          unitPrice,
          discount,
          salePrice,
          taxRate,
          tax,
          totalAmount,
        },
        {
          new: true,
          runValidators: true,
        },
      ),
    );
    return order;
  },

  // ==========================
  // UPDATE STATUS
  // ==========================
  async updateStatus(id: string, data: UpdateOrderStatusDto) {
    const order = await Order.findById(id);

    if (!order) {
      throw new AppError("Đơn hàng không tồn tại", 404);
    }

    const currentStatus = order.status;
    const nextStatus = data.status;

    if (!canChangeOrderStatus(currentStatus, nextStatus)) {
      throw new AppError(
        `Không thể chuyển trạng thái từ "${currentStatus}" sang "${nextStatus}".`,
        400,
      );
    }

    order.status = nextStatus;

    switch (nextStatus) {
      case "confirmed": {
        await Car.findByIdAndUpdate(order.carId, {
          status: "reserved",
          orderId: order._id,
        });

        break;
      }

      case "processing": {
        await Car.findByIdAndUpdate(order.carId, {
          status: "reserved",
          orderId: order._id,
        });

        break;
      }

      case "ready_for_delivery": {
        await Car.findByIdAndUpdate(order.carId, {
          status: "reserved",
          orderId: order._id,
        });

        break;
      }

      case "completed": {
        order.completedAt = new Date();

        await Car.findByIdAndUpdate(order.carId, {
          status: "sold",
          orderId: order._id,
          soldAt: new Date(),
        });

        break;
      }

      case "cancelled": {
        await Car.findByIdAndUpdate(order.carId, {
          status: "available",
          orderId: null,
          soldAt: null,
        });

        break;
      }
      case "pending":
        break;
    }

    await order.save();

    return populateOrder(Order.findById(order._id));
  },
  // ==========================
  // DELETE
  // ==========================
  async delete(id: string) {
    const order = await Order.findById(id);

    if (!order) {
      throw new AppError("Đơn hàng không tồn tại", 404);
    }

    await Car.findByIdAndUpdate(order.carId, {
      status: "available",
      orderId: null,
      soldAt: null,
    });

    await order.deleteOne();

    return {
      message: "Xóa đơn hàng thành công",
    };
  },
  async confirmOrder(id: string, userId: string) {
    const order = await Order.findById(id);

    if (!order) {
      throw new AppError("Không tìm thấy chi tiết đơn hàng!!", 404);
    }

    if (order.buyerId.toString() !== userId) {
      throw new AppError("Bạn không có quyền cập nhật!!", 403);
    }

    if (order.status !== "pending") {
      throw new AppError("Đơn hàng không ở trạng thái chờ xác nhận!!", 400);
    }
    order.status = "confirmed";

    order.confirmedAt = new Date();

    await order.save();

    return order;
  },
};
