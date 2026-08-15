import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/authMiddleware";
import {
  createPaymentOrder,
  getAllPayments,
  getPaymentDetail,
  updatePaymentStatus,
} from "../controllers/payment.controller";

export const paymentRouter = Router();
const authRequiredRole = [requireAuth, requireRole("admin", "staff")];

paymentRouter.get("/payments/getAll", requireAuth, getAllPayments);

paymentRouter.get("/payments/:id", ...authRequiredRole, getPaymentDetail);

paymentRouter.post("/payments", ...authRequiredRole, createPaymentOrder);

paymentRouter.patch(
  "/payments/:id/status",
  ...authRequiredRole,
  updatePaymentStatus,
);
