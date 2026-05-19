import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/authMiddleware";
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  cancelAppointment,
  deleteAppointment,
} from "../controllers/appointment.controller";

const appoinmentRouter = Router();

const authGuard = [requireAuth];
const adminGuard = [requireAuth, requireRole("admin")];
const staffGuard = [requireAuth, requireRole("admin", "staff")];

appoinmentRouter.post("/appointments", ...authGuard, createAppointment); // User đặt lịch
appoinmentRouter.get("/appointments", ...authGuard, getAppointments); // Xem danh sách
appoinmentRouter.get("/appointments/:id", ...authGuard, getAppointmentById); // Xem chi tiết
appoinmentRouter.patch(
  "/appointments/:id/status",
  ...staffGuard,
  updateAppointmentStatus,
); // Staff/Admin cập nhật
appoinmentRouter.patch(
  "/appointments/:id/cancel",
  ...authGuard,
  cancelAppointment,
); // User tự hủy
appoinmentRouter.delete("/appointments/:id", ...adminGuard, deleteAppointment); // Admin xóa

export default appoinmentRouter;
