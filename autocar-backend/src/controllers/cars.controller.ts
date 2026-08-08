import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware";
import { User } from "../models/user.model";
import { CarDetail } from "../models/carDetail.model";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
import logger from "../utils/logger";
import mongoose from "mongoose";
import { Car } from "../models/car.model";
import {
  validateCreateCarData,
  validateUpdateCarData,
} from "../validators/vaildateCar";
import { updateManagerStatusSchema } from "../schemas/car.schema";

// ─── GET ALL ──────────────────────────────────────────────────────────────────
export const getAllCar = catchAsync(async (req: Request, res: Response) => {
  const {
    page = "1",
    limit = "9",
    sort = "createdAt",
    order = "desc",
    all,
    search,
    transmission,
    brand,
    bodyType,
    priceMin,
    priceMax,
    yearMin,
    yearMax,
  } = req.query as Record<string, string>;

  const query: Record<string, any> = {};
  const sortOrder = order === "asc" ? 1 : -1;

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { id: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
    ];
  }

  if (brand && brand !== "Hãng xe") query.brand = brand;
  if (bodyType && bodyType !== "Tất cả loại")
    query.bodyType = { $in: [bodyType] };
  if (transmission && transmission !== "Tất cả")
    query.transmission = transmission;

  if (yearMin || yearMax) {
    query.year = {};
    if (yearMin) query.year.$gte = Number(yearMin);
    if (yearMax) query.year.$lte = Number(yearMax);
  }

  if (priceMin || priceMax) {
    query.price = {};
    if (priceMin) query.price.$gte = Number(priceMin);
    if (priceMax) query.price.$lte = Number(priceMax);
  }

  // Trả hết nếu all=true
  if (all === "true") {
    const cars = await Car.find(query)
      .sort({ [sort]: sortOrder })
      .select("-__v");
    return res.status(200).json({
      data: cars,
      pagination: {
        page: 1,
        limit: cars.length,
        total: cars.length,
        totalPages: 1,
      },
    });
  }

  const pageNum = Number(page);
  const limitNum = Number(limit);

  const [cars, total] = await Promise.all([
    Car.find(query)
      .sort({ [sort]: sortOrder })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .select("-__v"),
    Car.countDocuments(query),
  ]);

  res.status(200).json({
    data: cars,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  });
});

// ─── CREATE ───────────────────────────────────────────────────────────────────
export const createCar = catchAsync(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    throw new AppError("Unauthorized!", 401);
  }
  const validatedData = validateCreateCarData(req.body);

  const car = await Car.create({
    ...validatedData,
    managerId: null,
  });
  res.status(201).json(car);
});

// ─── UPDATE ───────────────────────────────────────────────────────────────────
export const updateCar = catchAsync(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new AppError("ID không hợp lệ!!", 400);
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("ID không hợp lệ!", 400);
  }
  const validatedData = validateUpdateCarData(req.body);

  const updatedCar = await Car.findByIdAndUpdate(id, validatedData, {
    new: true,
    runValidators: true,
  }).select("-__v");

  if (!updatedCar) {
    throw new AppError("Không tìm thấy xe!", 404);
  }

  // ───────────────── SYNC DETAIL ─────────────────
  await CarDetail.findOneAndUpdate(
    { carId: id },
    {
      name: updatedCar.name,
      brand: updatedCar.brand,
      price: updatedCar.price,
      year: updatedCar.year,
    },
    { new: true },
  );

  logger.info("Car updated", { carId: id });

  res.status(200).json(updatedCar);
});

// ─── DELETE ───────────────────────────────────────────────────────────────────
export const deleteCar = catchAsync(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  if (typeof id !== "string") {
    throw new AppError("ID không hợp lệ!!", 400);
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("ID không hợp lệ!", 400);
  }
  const deletedCar = await Car.findByIdAndDelete(id);

  if (!deletedCar) throw new AppError("Không tìm thấy xe!", 404);

  logger.info("Car deleted", { carId: id });
  res.status(200).json({ message: "Xoá thành công!" });
});

// ─── ASSIGN MANAGER ───────────────────────────────────────────────────────────
export const assignManager = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { carId } = req.params;

    const { managerId } = req.body;

    if (!managerId) throw new AppError("Thiếu managerId!", 400);

    const [staff, car] = await Promise.all([
      User.findById(managerId),
      Car.findById(carId),
    ]);

    if (!staff) throw new AppError("Không tìm thấy nhân viên!", 404);

    if (staff.role !== "staff")
      throw new AppError("User này không phải nhân viên!", 400);
    if (!car) throw new AppError("Không tìm thấy xe!", 404);

    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      { managerId, managerStatus: "pending" },
      { new: true },
    ).populate("managerId", "username email staffInfo");

    logger.info("Manager assigned", { carId, managerId, by: req.user?._id });

    res.status(200).json({
      success: true,
      message: `Cập nhật trạng thái thành công!!`,
      data: updatedCar,
    });
  },
);

// ─── GET ALL CARS WITH MANAGER ────────────────────────────────────────────────
export const getAllCarsWithManager = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const {
      page,
      hasManager,
      limit: limitQuery = "5",
    } = req.query as Record<string, string>;

    const limit = Math.min(Math.max(Number(limitQuery), 1), 50);
    const query: Record<string, any> = {};

    if (hasManager === "false") query.managerId = null;
    if (hasManager === "true") query.managerId = { $ne: null };

    const [cars, total] = await Promise.all([
      Car.find(query)
        .populate("managerId", "username email staffInfo avatar")
        .sort({ createdAt: -1 })
        .skip((Number(page) - 1) * limit)
        .limit(limit)
        .select("-__v"),
      Car.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: cars,
      pagination: {
        page: Number(page),
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  },
);

// ─── GET ALL STAFF ────────────────────────────────────────────────────────────
export const getAllStaff = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const staffList = await User.find({ role: "staff" })
      .select("username email staffInfo avatar")
      .sort({ createdAt: -1 });

    const staffIds = staffList.map((s) => s._id);

    const carCounts = await Car.aggregate([
      { $match: { managerId: { $in: staffIds } } },
      { $group: { _id: "$managerId", count: { $sum: 1 } } },
    ]);

    const countMap = Object.fromEntries(
      carCounts.map((c) => [c._id.toString(), c.count]),
    );

    const staffWithCarCount = staffList.map((staff) => ({
      ...staff.toObject(),
      carCount: countMap[staff._id.toString()] ?? 0,
    }));

    res.status(200).json({ success: true, data: staffWithCarCount });
  },
);

// ─── REMOVE MANAGER ───────────────────────────────────────────────────────────
export const removeManager = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { carId } = req.params;

    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      { managerId: null },
      { new: true },
    );

    if (!updatedCar) throw new AppError("Không tìm thấy xe!", 404);

    logger.info("Manager removed", { carId, by: req.user?._id });

    res.status(200).json({
      success: true,
      message: "Đã hủy phân bổ nhân viên!",
      data: updatedCar,
    });
  },
);

export const getCarsByManager = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const {
      page = "1",
      limit = "10",
      search,
      managerStatus = "all",
    } = req.query as Record<string, string>;

    const query: Record<string, any> = {
      managerId: req.user?._id,
    };
    if (managerStatus !== "all") {
      query.managerStatus = managerStatus;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ];
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);

    const [cars, total] = await Promise.all([
      Car.find(query)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .populate("managerId", "username email")
        .select("-__v"),

      Car.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: cars,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  },
);

export const updateManagerStatus = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (!req.user) {
      throw new AppError("Unauthorized!", 401);
    }

    const { managerStatus } = updateManagerStatusSchema.parse(req.body);

    const car = await Car.findById(id);

    if (!car) {
      throw new AppError("Không tìm thấy xe!", 404);
    }

    if (car.managerId?.toString() !== req.user._id.toString()) {
      throw new AppError("Bạn không được quản lý xe này!", 403);
    }

    car.managerStatus = managerStatus;

    await car.save();

    res.status(200).json({
      success: true,
      message: "Cập nhật trạng thái thành công!",
      data: car,
    });
  },
);
