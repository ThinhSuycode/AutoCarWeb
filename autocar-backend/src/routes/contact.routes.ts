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

contactRouter.get("/contacts", requireAuth, getContactRequests);
contactRouter.get("/contacts/:id", requireAuth, getContactRequestById);

contactRouter.post("/contacts", requireAuth, createContactRequest);
contactRouter.post("/contacts/:id", requireAuth, createContactRequest);

contactRouter.patch(
  "/contacts/staff/:id/status",
  ...staffGuard,
  updateContactRequestStatus,
);

contactRouter.patch(
  "/contacts/admin/:id/assign",
  ...adminGuard,
  assignManagerToContact,
);
contactRouter.delete("/contacts/:id", ...adminGuard, deleteContactRequest);
