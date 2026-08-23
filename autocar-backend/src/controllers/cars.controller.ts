import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
import logger from "../utils/logger";
import {
  validateCreateCarData,
  validateUpdateCarData,
} from "../validators/vaildateCar";
import { updateManagerStatusSchema } from "../schemas/car.schema";
import { validateObjectId } from "../utils/validateObjectId";
import { carService } from "../services/car.service";

export const getAllCar = catchAsync(async (req: Request, res: Response) => {
  const result = await carService.getAll(req.query as Record<string, string>);
  res.status(200).json(result);
});

// ─── CREATE ───────────────────────────────────────────────────────────────────
export const createCar = catchAsync(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    throw new AppError("Unauthorized!", 401);
  }
  const validatedData = validateCreateCarData(req.body);
  const car = await carService.create(validatedData);
  res.status(201).json(car);
});

export const updateCar = catchAsync(async (req: AuthRequest, res: Response) => {
  const id = validateObjectId(req.params.id);

  const validatedData = validateUpdateCarData(req.body);

  const updatedCar = await carService.update(id, validatedData);

  logger.info("Car updated", { carId: id });

  res.status(200).json(updatedCar);
});

// ─── DELETE ───────────────────────────────────────────────────────────────────
export const deleteCar = catchAsync(async (req: AuthRequest, res: Response) => {
  const id = validateObjectId(req.params.id);
  await carService.delete(id);

  logger.info("Car deleted", { carId: id });

  res.status(200).json({ message: "Xoá thành công!" });
});

// ─── ASSIGN MANAGER ───────────────────────────────────────────────────────────
export const assignManager = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const carId = validateObjectId(req.params.carId);

    const { managerId } = req.body;

    if (!managerId) throw new AppError("Thiếu managerId!", 400);

    const updatedCar = await carService.assignManager(carId, managerId);

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
    const result = await carService.getAllWithManager(
      req.query as Record<string, string>,
    );

    res.status(200).json({ success: true, ...result });
  },
);

// ─── GET ALL STAFF ────────────────────────────────────────────────────────────
export const getAllStaff = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const staffWithCarCount = await carService.getAllStaffWithCarCount();
    res.status(200).json({ success: true, data: staffWithCarCount });
  },
);

// ─── REMOVE MANAGER ───────────────────────────────────────────────────────────
export const removeManager = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const carId = validateObjectId(req.params.carId);

    const updatedCar = await carService.removeManager(carId);

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
    const result = await carService.getByManager(
      req.user?._id,
      req.query as Record<string, string>,
    );

    res.status(200).json({ success: true, ...result });
  },
);

export const updateManagerStatus = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const id = validateObjectId(req.params.id);
    if (!req.user) {
      throw new AppError("Unauthorized!", 401);
    }

    const { managerStatus } = updateManagerStatusSchema.parse(req.body);

    const car = await carService.updateManagerStatus(
      id,
      managerStatus,
      req.user._id,
    );

    res.status(200).json({
      success: true,
      message: "Cập nhật trạng thái thành công!",
      data: car,
    });
  },
);
