import type { Request, Response } from "express";
import { CarDetail } from "../models/carDetail.model";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
import logger from "../utils/logger";
import type { AuthRequest } from "../middleware/authMiddleware";

// ─── GET ALL — public, không cần biết user ────────────────────────────────────
export const getAllCarDetail = catchAsync(
  async (req: Request, res: Response) => {
    const cars = await CarDetail.find().select("-__v");
    res.status(200).json(cars);
  },
);

// ─── GET BY ID — public ───────────────────────────────────────────────────────
export const getCarDetailById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const car = await CarDetail.findOne({ id }).select("-__v");
    if (!car) throw new AppError("Không tìm thấy xe!", 404);

    res.status(200).json(car);
  },
);

// ─── CREATE ───────────────────────────────────────
export const createCarDetail = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const car = new CarDetail(req.body);
    const newCar = await car.save();

    logger.info("CarDetail created", { id: newCar.id, by: req.user?.id });
    res.status(201).json(newCar);
  },
);

// ─── UPDATE ───────────────────────────────────────
export const updateCarDetail = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const updatedCar = await CarDetail.findOneAndUpdate({ id }, req.body, {
      new: true,
      runValidators: true,
    }).select("-__v");

    if (!updatedCar) throw new AppError("Không tìm thấy xe!", 404);

    logger.info("CarDetail updated", { id, by: req.user?.id });
    res.status(200).json(updatedCar);
  },
);

// ─── DELETE ───────────────────────────────────────
export const deleteCarDetail = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const deletedCar = await CarDetail.findOneAndDelete({ id });
    if (!deletedCar) throw new AppError("Không tìm thấy xe!", 404);

    logger.info("CarDetail deleted", { id, by: req.user?.id });
    res.status(200).json({ message: "Xoá thành công!" });
  },
);
