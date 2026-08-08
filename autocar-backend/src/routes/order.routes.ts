import { Router } from "express";

import {
  createOrder,
  getOrders,
  getOrderDetail,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller";
import { requireAuth, requireRole } from "../middleware/authMiddleware";

const orderRouter = Router();
const authRequiredRole = [requireAuth, requireRole("admin", "staff")];

orderRouter.post("/orders", authRequiredRole, createOrder);
orderRouter.get("/orders", requireAuth, getOrders);
// orderRouter.patch("/orders/:id/status", requireAuth, getOrders);
orderRouter.get("/orders/:id", requireAuth, getOrderDetail);
orderRouter.patch("/orders/:id", authRequiredRole, updateOrder);
orderRouter.delete("/orders/:id", authRequiredRole, deleteOrder);

export default orderRouter;
