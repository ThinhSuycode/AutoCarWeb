import { populate } from "dotenv";
import { Car } from "../models/car.model";
import { Order } from "../models/order.model";
import { User } from "../models/user.model";
import {
  CreateOrderDto,
  UpdateOrderDto,
  UpdateOrderStatusDto,
} from "../schemas/order.schema";
import { AppError } from "../utils/AppError";

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

    const salePrice = data.salePrice ?? car.price;

    const tax = salePrice * (data.taxRate / 100);

    const discount = Math.max(0, unitPrice - salePrice);

    const totalAmount = salePrice + tax - (data.deposit ?? 0);

    const order = await Order.create({
      ...data,

      staffId,

      orderCode: generateOrderCode(),

      quantity: 1,

      unitPrice: car.price,

      salePrice,

      discount,

      tax,

      totalAmount,

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
      orders,
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

    const salePrice = data.salePrice ?? current.salePrice;

    const deposit = data.deposit ?? current.deposit;

    const taxRate = current.taxRate;

    const tax = salePrice * (taxRate / 100);

    const discount = Math.max(0, current.unitPrice - salePrice);

    const totalAmount = salePrice + tax - deposit;

    const order = await populateOrder(
      Order.findByIdAndUpdate(
        id,
        {
          ...data,
          salePrice,
          discount,
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

    order.status = data.status;

    switch (data.status) {
      case "completed":
        order.completedAt = new Date();

        await Car.findByIdAndUpdate(order.carId, {
          status: "sold",
          soldAt: new Date(),
        });

        break;

      case "cancelled":
        await Car.findByIdAndUpdate(order.carId, {
          status: "available",
          orderId: null,
          soldAt: null,
        });

        break;

      case "processing":
      case "pending":
        await Car.findByIdAndUpdate(order.carId, {
          status: "reserved",
        });

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
};
