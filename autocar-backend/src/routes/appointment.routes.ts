import express from "express";

import {
  createAppointment,
  confirmAppointment,
  completeAppointment,
  cancelAppointment,
  getAppointmentsAll,
} from "../controllers/appointment.controller";

import { requireAuth, requireRole } from "../middleware/authMiddleware";

export const appointmentRouter = express.Router();

appointmentRouter.get("/appointments", requireAuth, getAppointmentsAll);

appointmentRouter.post(
  "/appointments/contact/:contactId",
  requireAuth,
  requireRole("admin", "staff"),
  createAppointment,
);

appointmentRouter.patch(
  "/appointments/:id/confirm",
  requireAuth,
  requireRole("admin", "staff"),
  confirmAppointment,
);

appointmentRouter.patch(
  "/appointments/:id/complete",
  requireAuth,
  requireRole("admin", "staff"),
  completeAppointment,
);

appointmentRouter.patch(
  "/appointments/:id/cancel",
  requireAuth,
  requireRole("admin", "staff"),
  cancelAppointment,
);
