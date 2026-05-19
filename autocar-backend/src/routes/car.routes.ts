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
} from "../controllers/cars.controller";
import { requireAuth, requireRole } from "../middleware/authMiddleware";

export const carRouter = express.Router();
const adminGuard = [requireAuth, requireRole("admin")];

// ✅ Route cụ thể phải đứng TRƯỚC route có :id
carRouter.get("/cars/admin/all", ...adminGuard, getAllCarsWithManager);
carRouter.get("/cars/admin/staff", ...adminGuard, getAllStaff);
carRouter.patch("/cars/:carId/assign", ...adminGuard, assignManager);
carRouter.patch("/cars/:carId/unassign", ...adminGuard, removeManager);

// Route có :id đứng SAU
carRouter.get("/cars", getAllCar);
carRouter.post("/cars", requireAuth, requireRole("admin"), createCar);
carRouter.put("/cars/:id", requireAuth, requireRole("admin"), updateCar);
carRouter.patch("/cars/:id", requireAuth, requireRole("admin"), updateCar);
carRouter.delete("/cars/:id", requireAuth, requireRole("admin"), deleteCar);
