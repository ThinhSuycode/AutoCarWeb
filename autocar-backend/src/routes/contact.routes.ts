import express from "express";
import { requireAuth } from "../middleware/authMiddleware";
import {
  createContactRequest,
  getContactRequestById,
  updateContactRequestStatus,
} from "../controllers/contact.controller";

export const contactRouter = express.Router();

contactRouter.post("/contacts", createContactRequest);
contactRouter.get("/contacts/seller/:sellerId", getContactRequestById);
contactRouter.patch(
  "/contacts/:id/status",
  requireAuth,
  updateContactRequestStatus,
);
