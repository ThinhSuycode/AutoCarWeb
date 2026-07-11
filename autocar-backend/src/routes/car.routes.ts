import express from "express";
import {
  deleteCar,
  getAllCar,
  createCar,
  updateCar,
  getAllCarsWithManager,
  getAllStaff,
  assignManager,
  removeManager,
  getCarsByManager,
  updateManagerStatus,
} from "../controllers/cars.controller";
import { requireAuth, requireRole } from "../middleware/authMiddleware";

export const carRouter = express.Router();
const adminGuard = [requireAuth, requireRole("admin")];
const staffGuard = [requireAuth, requireRole("staff")];

carRouter.get("/cars/admin/all", ...adminGuard, getAllCarsWithManager);
carRouter.get("/cars/admin/staff", ...adminGuard, getAllStaff);
carRouter.patch("/cars/:carId/assign", ...adminGuard, assignManager);
carRouter.patch("/cars/:carId/unassign", ...adminGuard, removeManager);

carRouter.get("/cars/staff/my-cars", ...staffGuard, getCarsByManager);
carRouter.patch("/cars/staff/:id/status", ...staffGuard, updateManagerStatus);

carRouter.get("/cars", getAllCar);
carRouter.post("/cars", requireAuth, requireRole("admin"), createCar);
carRouter.put("/cars/:id", requireAuth, requireRole("admin"), updateCar);
carRouter.patch("/cars/:id", requireAuth, requireRole("admin"), updateCar);
carRouter.delete("/cars/:id", requireAuth, requireRole("admin"), deleteCar);
