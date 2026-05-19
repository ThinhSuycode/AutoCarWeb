import { Request, Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware";
import { Contact } from "../models/contact.model";
import logger from "../utils/logger";

export const createContactRequest = async (req: Request, res: Response) => {
  const {
    id,
    name,
    phone,
    message,
    carId,
    carName,
    managerId,
    buyerId,
    notes,
  } = req.body;

  if (!id) {
    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin bắt buộc",
      });
    }
  }

  const phoneRegex = /^(0|\+84)[0-9]{9}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
    return res.status(400).json({
      success: false,
      message: "Số điện thoại không hợp lệ",
    });
  }

  const contactRequest = await Contact.create({
    name,
    phone,
    message: message || "",
    carId,
    carName,
    managerId: managerId || null,
    buyerId: buyerId || null,
    notes: notes || "",
    status: "pending",
  });

  logger.info("Request Contact", {});

  res.status(201).json({
    success: true,
    message: "Gửi yêu cầu thành công",
    data: contactRequest,
  });
};

// READ - Lấy danh sách (giữ nguyên, đã ổn)
export const getContactRequests = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const userId = req.user.id;
    const {
      buyerId,
      managerId,
      carId,
      status,
      page = "1",
    } = req.query as Record<string, string>;
    const limit = 10;

    let query: Record<string, any> = {};

    if (buyerId) query.buyerId = buyerId;
    else if (managerId) query.managerId = managerId;
    else if (carId) query.carId = carId;
    else query.$or = [{ buyerId: userId }, { managerId: userId }];

    if (status) query.status = status;

    const [contactRequests, total] = await Promise.all([
      Contact.find(query)
        .skip((Number(page) - 1) * limit)
        .limit(limit)
        .populate("buyerId", "username email")
        .populate("managerId", "username email phone")
        .sort({ createdAt: -1 })
        .select("-__v"),
      Contact.countDocuments(query), // thêm total để FE biết tổng số trang
    ]);

    res.json({
      success: true,
      data: contactRequests,
      pagination: {
        page: Number(page),
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get contact requests error:", error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

// READ ONE
export const getContactRequestById = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { id } = req.params;
    const userId = req.user.id;

    const contactRequest = await Contact.findById(id)
      .populate("buyerId", "username email")
      .populate("managerId", "username email phone");

    if (!contactRequest) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy yêu cầu",
      });
    }
    if (!contactRequest.managerId || !contactRequest.managerId.equals(userId)) {
      return res.status(403).json({
        success: false,
        message: "Bạn không có quyền cập nhật",
      });
    }

    const isBuyer =
      contactRequest.buyerId && contactRequest.buyerId.equals(userId);

    const isSeller = contactRequest.managerId.equals(userId);

    if (!isBuyer && !isSeller) {
      return res.status(403).json({
        success: false,
        message: "Bạn không có quyền xem yêu cầu này",
      });
    }

    res.json({
      success: true,
      data: contactRequest,
    });
  } catch (error) {
    console.error("Get contact request error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

// UPDATE
export const updateContactRequestStatus = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { id } = req.params;
    const { status, notes } = req.body;
    const userId = req.user.id;

    const contactRequest = await Contact.findById(id);

    if (!contactRequest) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy yêu cầu",
      });
    }
    if (!contactRequest.managerId || !contactRequest.managerId.equals(userId)) {
      return res.status(403).json({
        success: false,
        message: "Bạn không có quyền cập nhật",
      });
    }

    if (!contactRequest.managerId.equals(userId)) {
      return res.status(403).json({
        success: false,
        message: "Bạn không có quyền cập nhật",
      });
    }

    const validStatuses = [
      "pending",
      "contacted",
      "viewing",
      "negotiating",
      "completed",
      "cancelled",
    ];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Trạng thái không hợp lệ",
      });
    }

    contactRequest.status = status;

    if (notes) {
      contactRequest.notes = notes;
    }

    await contactRequest.save();

    res.json({
      success: true,
      message: "Cập nhật thành công",
      data: contactRequest,
    });
  } catch (error) {
    console.error("Update contact request error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

// DELETE
export const deleteContactRequest = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { id } = req.params;
    const userId = req.user.id;

    const contactRequest = await Contact.findById(id);

    if (!contactRequest) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy yêu cầu",
      });
    }

    if (!contactRequest.managerId || !contactRequest.managerId.equals(userId)) {
      return res.status(403).json({
        success: false,
        message: "Bạn không có quyền cập nhật",
      });
    }
    const isBuyer =
      contactRequest.buyerId && contactRequest.buyerId.equals(userId);

    const isSeller = contactRequest.managerId.equals(userId);

    if (!isBuyer && !isSeller) {
      return res.status(403).json({
        success: false,
        message: "Không có quyền xóa",
      });
    }

    await Contact.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Xóa thành công",
    });
  } catch (error) {
    console.error("Delete contact request error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};
