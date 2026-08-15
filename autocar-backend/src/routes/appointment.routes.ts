import express from "express";

import {
  createAppointment,
  confirmAppointment,
  completeAppointment,
  cancelAppointment,
  getMyAppointment,
  getAppointmentDetail,
  getAllAppointment,
  deleteAppointment,
  exportAppointments,
} from "../controllers/appointment.controller";

import { requireAuth, requireRole } from "../middleware/authMiddleware";

export const appointmentRouter = express.Router();

const AuthRequiredRole = [requireAuth, requireRole("admin", "staff")];

appointmentRouter.get(
  "/appointments/export",
  ...AuthRequiredRole,
  exportAppointments,
);
appointmentRouter.get(
  "/appointments/:id/export",
  ...AuthRequiredRole,
  exportAppointments,
);

appointmentRouter.get(
  "/appointments/:id",
  ...AuthRequiredRole,
  getAppointmentDetail,
);
appointmentRouter.get("/appointments", ...AuthRequiredRole, getAllAppointment);
appointmentRouter.get("/my-appointments", requireAuth, getMyAppointment);

appointmentRouter.post(
  "/appointments/contact/:contactId",
  ...AuthRequiredRole,
  createAppointment,
);

appointmentRouter.patch(
  "/appointments/:id/confirm",
  requireAuth,
  confirmAppointment,
);

appointmentRouter.patch(
  "/appointments/:id/complete",
  ...AuthRequiredRole,
  completeAppointment,
);

appointmentRouter.patch(
  "/appointments/:id/cancel",
  requireAuth,
  cancelAppointment,
);
appointmentRouter.delete(
  "/appointments/:id/delete",
  requireAuth,
  deleteAppointment,
);
