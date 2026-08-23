import mongoose from "mongoose";
import { Contact, ContactStatusType } from "../models/contact.model";
import { Appointment } from "../models/appoinment.model";
import { AppError } from "../utils/AppError";

interface GetContactsParams {
  buyerId?: string;
  managerId?: string;
  carId?: string;
  search?: string;
  status?: string;
  page?: string;
  limit?: string;
}

const validateOptionalObjectId = (value: string | undefined, field: string) => {
  if (value && !mongoose.Types.ObjectId.isValid(value)) {
    throw new AppError(`${field} không hợp lệ`, 400);
  }
};

const STATUS_TIMELINE: Record<string, { action: string; note: string }> = {
  contacted: { action: "CONTACTED_CUSTOMER", note: "Đã liên hệ khách hàng" },
  appointment_created: {
    action: "CREATE_APPOINTMENT",
    note: "Đã tạo lịch hẹn",
  },
  completed: {
    action: "COMPLETE_CONTACT",
    note: "Khách hàng đã hoàn thành quy trình",
  },
  cancelled: { action: "CANCEL_CONTACT", note: "Yêu cầu đã bị hủy" },
};

export const contactService = {
  create: async (payload: Record<string, any>, buyerId: any) => {
    const { carId, name, phone, message, carName, carBrand, carPrice, notes } =
      payload;

    return Contact.create({
      name,
      phone,
      message: message ?? "",
      notes: notes ?? "",
      carId: carId ?? null,
      carName: carName ?? null,
      carBrand: carBrand ?? null,
      carPrice: carPrice ?? null,
      buyerId: buyerId ?? null,
      managerId: null,
      assignedAt: null,
      status: "new",
      timeline: [
        {
          action: "CREATE_CONTACT",
          note: "Khách gửi yêu cầu liên hệ",
          userId: buyerId ?? null,
        },
      ],
    });
  },

  getAll: async (
    params: GetContactsParams,
    currentUser: { _id: any; role: string },
  ) => {
    const {
      buyerId,
      managerId,
      carId,
      search,
      status,
      page = "1",
      limit = "10",
    } = params;

    const pageNum = Math.max(Number(page) || 1, 1);
    const pageSize = Math.min(Math.max(Number(limit) || 10, 1), 50);

    validateOptionalObjectId(buyerId, "buyerId");
    validateOptionalObjectId(managerId, "managerId");
    validateOptionalObjectId(carId, "carId");

    const query: Record<string, any> = {};

    if (search?.trim()) {
      query.$or = [
        { name: { $regex: search.trim(), $options: "i" } },
        { phone: { $regex: search.trim(), $options: "i" } },
      ];
    }

    if (buyerId) query.buyerId = buyerId;
    if (managerId) query.managerId = managerId;
    if (carId) query.carId = carId;
    if (status && status !== "all") query.status = status;

    if (!buyerId && !managerId && !carId) {
      if (currentUser.role === "staff") query.managerId = currentUser._id;
      if (currentUser.role === "user") query.buyerId = currentUser._id;
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

    return {
      data: contacts,
      pagination: {
        page: pageNum,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  },

  getById: async (id: string) => {
    const contact = await Contact.findById(id)
      .populate("buyerId", "username email")
      .populate("managerId", "username email")
      .select("-__v");

    if (!contact) throw new AppError("Không tìm thấy yêu cầu", 404);
    return contact;
  },

  updateStatus: async (id: string, status: ContactStatusType, userId: any) => {
    const timelineEntry = STATUS_TIMELINE[status];
    if (!timelineEntry) throw new AppError("Trạng thái không hợp lệ", 400);

    const contact = await Contact.findById(id);
    if (!contact) throw new AppError("Không tìm thấy yêu cầu", 404);

    contact.status = status;
    contact.timeline.push({ ...timelineEntry, userId });
    await contact.save();

    return contact;
  },

  assignManager: async (contactId: string, managerId: any, userId: any) => {
    const normalizedManagerId =
      managerId && managerId !== "" ? managerId : null;

    if (
      normalizedManagerId &&
      !mongoose.Types.ObjectId.isValid(normalizedManagerId)
    ) {
      throw new AppError("managerId không hợp lệ", 400);
    }

    const contact = await Contact.findById(contactId);
    if (!contact) throw new AppError("Không tìm thấy yêu cầu", 404);

    contact.managerId = normalizedManagerId;
    contact.assignedAt = normalizedManagerId ? new Date() : null;

    if (normalizedManagerId) {
      contact.status = "assigned";
      await Appointment.deleteOne({ contactId });

      contact.timeline.push({
        action: "ASSIGN_MANAGER",
        note: "Phân công sale phụ trách",
        userId,
      });
    } else {
      contact.status = "new";
      contact.timeline.push({
        action: "UNASSIGN_MANAGER",
        note: "Hủy phân công sale",
        userId,
      });
    }

    await contact.save();
    await contact.populate("buyerId", "username email");
    await contact.populate("managerId", "username email");

    return { contact, normalizedManagerId };
  },

  delete: async (id: string) => {
    const contact = await Contact.findById(id);
    if (!contact) throw new AppError("Không tìm thấy yêu cầu", 404);

    const appointment = await Appointment.findOne({ contactId: id });

    await Contact.findByIdAndDelete(id);
    if (appointment) await appointment.deleteOne();

    return contact;
  },
};
