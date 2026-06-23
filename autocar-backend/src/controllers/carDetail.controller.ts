import type { Request, Response } from "express";
import mongoose from "mongoose";

import { CarDetail } from "../models/carDetail.model";

import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
import logger from "../utils/logger";

import type { AuthRequest } from "../middleware/authMiddleware";
import { Car } from "../models/car.model";
import {
  validateCreateCarDetail,
  validateUpdateCarDetail,
} from "../utils/vaildateCarDetail";

// ─── GET ALL ────────────────────────────────────────────────────────────────
export const getAllCarDetail = catchAsync(
  async (req: Request, res: Response) => {
    const carDetail = await CarDetail.find().populate("carId").select("-__v");
    res.status(200).json(carDetail);
  },
);

// ─── GET BY ID ──────────────────────────────────────────────────────────────
export const getCarDetailById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== "string") {
      throw new AppError("ID xe không hợp lệ!", 400);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("ID xe không hợp lệ!", 400);
    }

    const car = await CarDetail.findOne({
      carId: id,
    })
      .populate("carId")
      .select("-__v");

    if (!car) {
      throw new AppError("Không tìm thấy chi tiết xe tại getId!", 404);
    }

    res.status(200).json(car);
  },
);

// ─── CREATE ────────────────────────────────────────────────────────────────
export const createCarDetail = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized!", 401);
    }
    const { carId } = req.body;

    if (!carId) {
      throw new AppError("Không lấy được carId!", 404);
    }
    const cars = await Car.findById(carId);

    if (!cars) {
      throw new AppError("Không tìm thấy xe!", 404);
    }
    const existed = await CarDetail.findOne({
      carId: req.body.carId,
    });

    if (existed) {
      throw new AppError("Xe đã có nội dung chi tiết!", 400);
    }
    // const validatedData = validateCreateCarDetail(req.body);

    const carDetail = await CarDetail.create(req.body);

    logger.info("CarDetail created", {
      carId: carId,
      by: req.user?._id,
    });

    res.status(201).json(carDetail);
  },
);

// ─── UPDATE ────────────────────────────────────────────────────────────────
export const updateCarDetail = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
      throw new AppError("ID xe không hợp lệ!", 400);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("ID xe không hợp lệ!", 400);
    }

    const validatedData = validateUpdateCarDetail(req.body);

    const updatedCar = await CarDetail.findOneAndUpdate(
      { carId: id },
      validatedData,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!updatedCar) {
      throw new AppError("Không tìm thấy thông tin xe!", 404);
    }

    logger.info("CarDetail updated", {
      carId: id,
      by: req.user?._id,
    });

    res.status(200).json(updatedCar);
  },
);

// ─── DELETE ────────────────────────────────────────────────────────────────
export const deleteCarDetail = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
      throw new AppError("ID xe không hợp lệ!", 400);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("ID xe không hợp lệ!", 400);
    }

    const deletedCar = await CarDetail.findOneAndDelete({
      carId: id,
    });

    if (!deletedCar) {
      throw new AppError("Không tìm thấy xe!", 404);
    }

    logger.info("CarDetail deleted", {
      carId: id,
      by: req.user?._id,
    });

    res.status(200).json({
      message: "Xoá thành công!",
    });
  },
);
