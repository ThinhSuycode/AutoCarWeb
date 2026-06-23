import express from "express";
import { requireAuth, requireRole } from "../middleware/authMiddleware";
import {
  createContactRequest,
  getContactRequests,
  getContactRequestById,
  updateContactRequestStatus,
  assignManagerToContact,
  deleteContactRequest,
} from "../controllers/contact.controller";

export const contactRouter = express.Router();

const adminGuard = [requireAuth, requireRole("admin")];
const staffGuard = [requireAuth, requireRole("staff")];

// ── Create ────────────────────────────────────────────────────────────────────
contactRouter.post("/contacts", requireAuth, createContactRequest); // liên hệ chung
contactRouter.post("/contacts/:id", requireAuth, createContactRequest); // liên hệ về xe :id = carId

// ── Read ──────────────────────────────────────────────────────────────────────
contactRouter.get("/contacts", requireAuth, getContactRequests);
contactRouter.get("/contacts/:id", requireAuth, getContactRequestById);

// ── Staff: cập nhật status ────────────────────────────────────────────────────
contactRouter.patch(
  "/contacts/staff/:id/status",
  ...staffGuard,
  updateContactRequestStatus,
);

// ── Admin ─────────────────────────────────────────────────────────────────────
contactRouter.patch(
  "/contacts/admin/:id/assign",
  ...adminGuard,
  assignManagerToContact,
);
contactRouter.delete("/contacts/:id", ...adminGuard, deleteContactRequest);
