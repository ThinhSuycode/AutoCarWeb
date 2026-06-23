import type { Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware";
import { Contact } from "../models/contact.model";
import logger from "../utils/logger";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
import { validatePhone } from "../utils/validate";
import mongoose from "mongoose";

// ─── CREATE ───────────────────────────────────────────────────────────────────
export const createContactRequest = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string | undefined;
    const { name, phone, message, carName, carBrand, carPrice, notes } =
      req.body;

    if (!name || !phone) {
      throw new AppError("Thiếu thông tin bắt buộc: name, phone", 400);
    }

    if (!validatePhone(phone)) {
      throw new AppError("Số điện thoại không hợp lệ", 400);
    }

    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("ID xe không hợp lệ", 400);
    }

    const contact = await Contact.create({
      name,
      phone,
      message: message ?? "",
      notes: notes ?? "",
      carId: id ?? null,
      carName: carName ?? null,
      carBrand: carBrand ?? null,
      carPrice: carPrice ?? null,
      buyerId: req.user?._id ?? null,
      managerId: null,
      assignedAt: null,
      status: "pending",
    });

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

    const {
      buyerId,
      managerId,
      carId,
      search,
      status,
      page = "1",
      limit = "10",
    } = req.query as Record<string, string>;

    const pageNum = Math.max(Number(page) || 1, 1);
    const pageSize = Math.min(Math.max(Number(limit) || 10, 1), 50);

    const query: Record<string, any> = {};

    if (search?.trim()) {
      query.$or = [
        { name: { $regex: search.trim(), $options: "i" } },
        { phone: { $regex: search.trim(), $options: "i" } },
      ];
    }

    if (buyerId) {
      if (!mongoose.Types.ObjectId.isValid(buyerId))
        throw new AppError("buyerId không hợp lệ", 400);
      query.buyerId = buyerId;
    }

    if (managerId) {
      if (!mongoose.Types.ObjectId.isValid(managerId))
        throw new AppError("managerId không hợp lệ", 400);
      query.managerId = managerId;
    }

    if (carId) {
      if (!mongoose.Types.ObjectId.isValid(carId))
        throw new AppError("carId không hợp lệ", 400);
      query.carId = carId;
    }

    if (status && status !== "all") query.status = status;

    if (!buyerId && !managerId && !carId) {
      switch (req.user.role) {
        case "staff":
          query.managerId = req.user._id;
          break;
        case "user":
          query.buyerId = req.user._id;
          break;
        default:
          break;
      }
    }

    const [contacts, total] = await Promise.all([
      Contact.find(query)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * pageSize)
        .limit(pageSize)
        .populate("buyerId", "username email")
        .populate("managerId", "username email")
        .select("-__v")
        .lean(),
      Contact.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        page: pageNum,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  },
);

// ─── GET ONE ─────────────────────────────────────────────────────────────────
export const getContactRequestById = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new AppError("Unauthorized", 401);

    const id = (req.params.id as string) || undefined;

    if (id && !mongoose.Types.ObjectId.isValid(id))
      throw new AppError("ID không hợp lệ", 400);

    const contact = await Contact.findById(id)
      .populate("buyerId", "username email")
      .populate("managerId", "username email")
      .select("-__v");

    if (!contact) throw new AppError("Không tìm thấy yêu cầu", 404);

    const userId = req.user._id.toString();
    const role = req.user.role;
    const isBuyer = contact.buyerId?.toString() === userId;
    const isManager = contact.managerId?.toString() === userId;

    if (role !== "admin" && !isBuyer && !isManager)
      throw new AppError("Bạn không có quyền xem yêu cầu này", 403);

    res.json({ success: true, data: contact });
  },
);

// ─── UPDATE STATUS ────────────────────────────────────────────────────────────
export const updateContactRequestStatus = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new AppError("Unauthorized", 401);

    const id = (req.params.id as string) || undefined;
    const { status } = req.body;

    if (id && !mongoose.Types.ObjectId.isValid(id))
      throw new AppError("ID không hợp lệ", 400);

    const validStatuses = ["pending", "contacted", "done", "cancelled"];
    if (!status || !validStatuses.includes(status))
      throw new AppError(
        `Trạng thái không hợp lệ. Hợp lệ: ${validStatuses.join(", ")}`,
        400,
      );

    const contact = await Contact.findById(id);
    if (!contact) throw new AppError("Không tìm thấy yêu cầu", 404);

    const userId = req.user._id.toString();
    const role = req.user.role;
    const isManager = contact.managerId?.toString() === userId;

    if (role !== "admin" && !isManager)
      throw new AppError("Bạn không có quyền cập nhật yêu cầu này", 403);

    contact.status = status;

    await contact.save();

    logger.info("Contact status updated", {
      contactId: id,
      status,
      by: req.user._id,
    });

    res.json({ success: true, message: "Cập nhật thành công", data: contact });
  },
);

// ─── ASSIGN MANAGER ───────────────────────────────────────────────────────────
export const assignManagerToContact = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new AppError("Unauthorized", 401);

    const contactId = (req.params.id as string) || undefined;
    const { managerId } = req.body;

    if (contactId && !mongoose.Types.ObjectId.isValid(contactId))
      throw new AppError("ID contact không hợp lệ", 400);

    const normalizedManagerId =
      managerId && managerId !== "" ? managerId : null;

    if (
      normalizedManagerId &&
      !mongoose.Types.ObjectId.isValid(normalizedManagerId)
    ) {
      throw new AppError("managerId không hợp lệ", 400);
    }

    const contact = await Contact.findByIdAndUpdate(
      contactId,
      {
        managerId: managerId ?? null,
        assignedAt: managerId ? new Date() : null,
        // status: "pending",
      },
      { new: true, runValidators: true },
    )
      .populate("buyerId", "username email")
      .populate("managerId", "username email");

    if (!contact) throw new AppError("Không tìm thấy yêu cầu", 404);

    logger.info("Contact assigned", {
      contactId,
      managerId: managerId ?? null,
      by: req.user._id,
    });

    res.json({
      success: true,
      message: managerId ? "Phân công thành công" : "Hủy phân công thành công",
      data: contact,
    });
  },
);

// ─── DELETE ───────────────────────────────────────────────────────────────────
export const deleteContactRequest = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new AppError("Unauthorized", 401);

    const id = (req.params.id as string) || undefined;

    if (id && !mongoose.Types.ObjectId.isValid(id))
      throw new AppError("ID không hợp lệ", 400);

    const contact = await Contact.findById(id);
    if (!contact) throw new AppError("Không tìm thấy yêu cầu", 404);

    const userId = req.user._id.toString();
    const role = req.user.role;
    const isBuyer = contact.buyerId?.toString() === userId;

    if (role !== "admin" && !isBuyer)
      throw new AppError("Bạn không có quyền xóa yêu cầu này", 403);

    await Contact.findByIdAndDelete(id);

    logger.info("Contact deleted", { contactId: id, by: req.user._id });

    res.json({ success: true, message: "Xóa thành công" });
  },
);
