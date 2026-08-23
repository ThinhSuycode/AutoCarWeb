import type { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import logger from "../utils/logger";
import type { AuthRequest } from "../middleware/authMiddleware";
import { validateObjectId } from "../utils/validateObjectId";
import { carDetailService } from "../services/carDetail.service";
import {
  validateCreateCarDetail,
  validateUpdateCarDetail,
} from "../validators/validateCarDetail";

// ─── GET ALL ────────────────────────────────────────────────────────────────
export const getAllCarDetail = catchAsync(
  async (req: Request, res: Response) => {
    const carDetail = await carDetailService.getAll();
    res.status(200).json(carDetail);
  },
);

// ─── GET BY ID ──────────────────────────────────────────────────────────────
export const getCarDetailById = catchAsync(
  async (req: Request, res: Response) => {
    const id = validateObjectId(req.params.id);
    const car = await carDetailService.getByCarId(id);
    res.status(200).json(car);
  },
);

// ─── CREATE ────────────────────────────────────────────────────────────────
export const createCarDetail = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const validatedData = validateCreateCarDetail(req.body);

    const carDetail = await carDetailService.create(validatedData);

    logger.info("CarDetail created", {
      carId: carDetail.carId,
      by: req.user?._id,
    });

    res.status(201).json(carDetail);
  },
);

// ─── UPDATE ────────────────────────────────────────────────────────────────
export const updateCarDetail = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const id = validateObjectId(req.params.id);
    const validatedData = validateUpdateCarDetail(req.body);

    console.log("data", validatedData);
    const updatedCar = await carDetailService.updateByCarId(id, validatedData);
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
    const id = validateObjectId(req.params.id);

    await carDetailService.deleteByCarId(id);
    logger.info("CarDetail deleted", {
      carId: id,
      by: req.user?._id,
    });

    res.status(200).json({
      message: "Xoá thành công!",
    });
  },
);
