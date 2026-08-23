import type { Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware";
import logger from "../utils/logger";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
import { validatedCreateContact } from "../validators/validateContact";
import { validateObjectId } from "../utils/validateObjectId";
import { contactService } from "../services/contact.service";

// ─── CREATE ───────────────────────────────────────────────────────────────────
export const createContactRequest = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const id = validateObjectId(req.params.id);
    const validated = validatedCreateContact(req.body);

    const contact = await contactService.create(
      { ...validated, carId: id },
      req.user?._id,
    );

    logger.info("Contact created", {
      contactId: contact._id,
      carId: id ?? null,
      by: req.user?._id ?? "anonymous",
    });

    res.status(201).json({
      success: true,
      message: "Gửi yêu cầu thành công",
      data: contact,
    });
  },
);

// ─── GET ALL ─────────────────────────────────────────────────────────────────
export const getContactRequests = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new AppError("Unauthorized", 401);
    const result = await contactService.getAll(
      req.query as Record<string, string>,
      req.user,
    );

    res.status(200).json({ success: true, ...result });
  },
);

// ─── GET ONE ─────────────────────────────────────────────────────────────────
export const getContactRequestById = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const id = validateObjectId(req.params.id);

    const contact = await contactService.getById(id);

    const userId = req.user?._id.toString();
    const role = req.user?.role;
    const isBuyer = contact.buyerId?.toString() === userId;
    const isManager = contact.managerId?.toString() === userId;

    if (role !== "admin" && !isBuyer && !isManager) {
      throw new AppError("Bạn không có quyền xem yêu cầu này", 403);
    }

    res.json(contact);
  },
);

// ─── UPDATE STATUS ────────────────────────────────────────────────────────────
export const updateContactRequestStatus = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new AppError("Unauthorized", 401);
    const id = validateObjectId(req.params.id);
    const { status } = req.body;

    const existing = await contactService.getById(id);
    const userId = req.user._id.toString();

    const contact = await contactService.updateStatus(id, status, req.user._id);

    logger.info("Contact status updated", {
      contactId: id,
      status,
      by: req.user._id,
    });

    res.json({
      success: true,
      message: "Cập nhật thành công",
      data: contact,
    });
  },
);

// ─── ASSIGN MANAGER ───────────────────────────────────────────────────────────
export const assignManagerToContact = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new AppError("Unauthorized", 401);
    const contactId = validateObjectId(req.params.id);
    const { managerId } = req.body;

    const { contact, normalizedManagerId } = await contactService.assignManager(
      contactId,
      managerId,
      req.user._id,
    );

    logger.info("Contact assigned", {
      contactId,
      managerId: normalizedManagerId,
      by: req.user._id,
    });

    res.json({
      success: true,
      message: normalizedManagerId
        ? "Phân công thành công"
        : "Hủy phân công thành công",
      data: contact,
    });
  },
);

// ─── DELETE ───────────────────────────────────────────────────────────────────
export const deleteContactRequest = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new AppError("Unauthorized", 401);
    const id = validateObjectId(req.params.id);

    const existing = await contactService.getById(id);
    const userId = req.user._id.toString();
    const isBuyer = existing.buyerId?.toString() === userId;

    if (req.user.role !== "admin" && !isBuyer) {
      throw new AppError("Bạn không có quyền xóa yêu cầu này", 403);
    }

    await contactService.delete(id);

    logger.info("Contact deleted", { contactId: id, by: req.user._id });

    res.json({ success: true, message: "Xóa thành công" });
  },
);
