import ExcelJS from "exceljs";
import { Appointment } from "../models/appoinment.model";

import mongoose from "mongoose";
import { Contact, ContactStatusType } from "../models/contact.model";
import { AppError } from "../utils/AppError";

interface ExportAppointmentParams {
  appointmentId?: string;
  search?: string;
  status?: string;
  sort?: string;
}

export const buildSortOption = (sort: string): Record<string, 1 | -1> => {
  switch (sort) {
    case "date_asc":
      return { appointmentDate: 1 };
    case "created_desc":
      return { createdAt: -1 };
    case "created_asc":
      return { createdAt: 1 };
    case "date_desc":
    default:
      return { appointmentDate: -1 };
  }
};

const withActorsPopulate = (query: any) =>
  query
    .populate("appointmentCar", "name brand thumbnail price color year")
    .populate("createdBy", "username email")
    .populate("confirmedBy", "username email")
    .populate("completedBy", "username email")
    .populate("cancelledBy", "username email");

const withContactPopulate = (query: any, search = "") =>
  query.populate({
    path: "contactId",
    populate: [
      {
        path: "buyerId",
        select: "username email phone",
        match: search ? { username: { $regex: search, $options: "i" } } : {},
      },
      { path: "managerId", select: "username email" },
      { path: "carId", select: "name brand year thumbnail price" },
    ],
  });

const withDetailPopulate = (query: any) =>
  query
    .populate({
      path: "contactId",
      populate: [
        { path: "buyerId", select: "username email phone address" },
        { path: "managerId", select: "username email phone" },
        { path: "carId", select: "name brand price year color thumbnail" },
      ],
    })
    .populate("appointmentCar", "name brand thumbnail price color year")
    .populate("orderId")
    .populate("createdBy", "username email");

export const appointmentService = {
  getAll: async ({
    status = "all",
    search = "",
    sort = "date_desc",
    page = "1",
    limit = "10",
  }: {
    status?: string;
    search?: string;
    sort?: string;
    page?: string;
    limit?: string;
  }) => {
    const currentPage = Number(page);
    const pageSize = Number(limit);
    const skip = (currentPage - 1) * pageSize;

    const query: Record<string, any> = {};
    if (status !== "all") query.status = status;

    const appointments = await withContactPopulate(
      withActorsPopulate(Appointment.find(query)),
      search,
    ).sort(buildSortOption(sort));

    // populate `match` trả về null nếu buyer không khớp search -> lọc bỏ
    const filtered = appointments.filter(
      (item: any) => item.contactId?.buyerId,
    );

    return {
      data: filtered.slice(skip, skip + pageSize),
      pagination: {
        page: currentPage,
        limit: pageSize,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / pageSize),
      },
    };
  },

  // ─── GET MY APPOINTMENTS (buyer) ────────────────────────────────────────────
  getMyAppointments: async (buyerId: any) => {
    const contactIds = (await Contact.find({ buyerId }).select("_id")).map(
      (c) => c.id,
    );

    return withActorsPopulate(
      withContactPopulate(
        Appointment.find({ contactId: { $in: contactIds } }),
      ).populate("orderId"),
    ).sort({ appointmentDate: -1 });
  },

  // ─── GET DETAIL (by contactId) ──────────────────────────────────────────────
  getDetailByContactId: async (contactId: string) => {
    return withDetailPopulate(Appointment.findOne({ contactId }));
  },

  // ─── CREATE ─────────────────────────────────────────────────────────────────
  create: async (
    contactId: string,
    payload: Record<string, any>,
    userId: any,
  ) => {
    const contact = await Contact.findById(contactId);
    if (!contact) throw new AppError("Không tìm thấy contact", 404);

    const existed = await Appointment.findOne({
      contactId,
      status: { $in: ["pending", "confirmed"] },
    });
    if (existed) return { conflict: true } as const;

    const appointment = await Appointment.create({
      contactId,
      appointmentType: payload.appointmentType,
      appointmentCar: contact.carId || payload.appointmentCar,
      appointmentDate: payload.appointmentDate,
      appointmentTime: payload.appointmentTime,
      showroom: payload.showroom,
      note: payload.note,
      createdBy: userId,
    });

    contact.status = "appointment_created";
    contact.timeline.push({
      action: "CREATE_APPOINTMENT",
      note: `Tạo lịch hẹn tại ${payload.showroom}`,
      userId,
    });
    await contact.save();

    return { conflict: false, appointment } as const;
  },

  // ─── STATUS UPDATES ─────────────────────────────────────────────────────────
  confirm: async (id: string, userId: any) => {
    const appointment = await Appointment.findById(id);
    if (!appointment) throw new AppError("Không tìm thấy lịch hẹn", 404);

    appointment.status = "confirmed";
    appointment.confirmedBy = new mongoose.Types.ObjectId(userId);
    appointment.confirmedAt = new Date();
    await appointment.save();

    return appointment;
  },

  /** Dùng chung cho complete/cancel — cả 2 đều update appointment + đồng bộ Contact.timeline */
  updateStatus: async ({
    id,
    status,
    actorField,
    timelineAction,
    timelineNote,
    contactStatus,
    userId,
  }: {
    id: string;
    status: "completed" | "cancelled";
    actorField: "completedBy" | "cancelledBy";
    timelineAction: string;
    timelineNote: string;
    contactStatus: ContactStatusType;
    userId: any;
  }) => {
    const appointment = await Appointment.findById(id);
    if (!appointment) throw new AppError("Không tìm thấy lịch hẹn", 404);

    appointment.status = status;
    (appointment as any)[actorField] = new mongoose.Types.ObjectId(userId);
    (appointment as any)[`${status}At`] = new Date();
    await appointment.save();

    const contact = await Contact.findById(appointment.contactId);
    if (contact) {
      contact.status = contactStatus;
      contact.timeline.push({
        action: timelineAction,
        note: timelineNote,
        userId,
      });
      await contact.save();
    }

    return appointment;
  },

  // ─── DELETE (by contactId) ──────────────────────────────────────────────────
  deleteByContactId: async (contactId: string) => {
    const appointment = await Appointment.findOne({ contactId });
    if (!appointment) throw new AppError("Không tìm thấy lịch hẹn", 404);

    await appointment.deleteOne();
    return appointment;
  },
};

export const exportAppointmentExcel = async ({
  appointmentId,
  search = "",
  status = "all",
  sort = "date_desc",
}: ExportAppointmentParams) => {
  const query: Record<string, any> = {};

  if (appointmentId) {
    query._id = appointmentId;
  }

  if (!appointmentId && status !== "all") {
    query.status = status;
  }

  let sortOption: Record<string, 1 | -1> = {
    appointmentDate: -1,
  };

  switch (sort) {
    case "date_asc":
      sortOption = {
        appointmentDate: 1,
      };
      break;

    case "created_desc":
      sortOption = {
        createdAt: -1,
      };
      break;

    case "created_asc":
      sortOption = {
        createdAt: 1,
      };
      break;
  }

  const appointments = await Appointment.find(query)
    .populate({
      path: "contactId",
      populate: [
        {
          path: "buyerId",
          select: "username email phone",
          match:
            !appointmentId && search
              ? {
                  username: {
                    $regex: search,
                    $options: "i",
                  },
                }
              : {},
        },
        {
          path: "managerId",
          select: "username email",
        },
        {
          path: "carId",
          select: "name brand image price",
        },
      ],
    })
    .populate("appointmentCar", "name brand image price")
    .populate("createdBy", "username email")
    .sort(sortOption);

  const workbook = new ExcelJS.Workbook();

  workbook.creator = "AutoViet";

  workbook.created = new Date();

  const sheet = workbook.addWorksheet("Appointments");

  sheet.columns = [
    {
      header: "Khách hàng",
      key: "customer",
      width: 25,
    },
    {
      header: "Email",
      key: "email",
      width: 30,
    },
    {
      header: "Sale phụ trách",
      key: "manager",
      width: 20,
    },
    {
      header: "Xe",
      key: "car",
      width: 30,
    },
    {
      header: "Loại lịch hẹn",
      key: "type",
      width: 18,
    },
    {
      header: "Ngày hẹn",
      key: "date",
      width: 18,
    },
    {
      header: "Giờ",
      key: "time",
      width: 15,
    },
    {
      header: "Showroom",
      key: "showroom",
      width: 25,
    },
    {
      header: "Trạng thái",
      key: "status",
      width: 18,
    },
    {
      header: "Người tạo",
      key: "createdBy",
      width: 20,
    },
    {
      header: "Ngày tạo",
      key: "createdAt",
      width: 22,
    },
  ];

  sheet.getRow(1).font = {
    bold: true,
    color: {
      argb: "FFFFFF",
    },
  };

  sheet.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {
      argb: "2563EB",
    },
  };

  appointments.forEach((item: any) => {
    if (search && !item.contactId?.buyerId) return;

    sheet.addRow({
      customer: item.contactId?.buyerId?.username ?? "",

      email: item.contactId?.buyerId?.email ?? "",

      manager: item.contactId?.managerId?.username ?? "Chưa phân công",

      car:
        item.contactId?.carId?.name ??
        item.appointmentCar?.name ??
        item.contactId?.carName,

      type: item.appointmentType,

      date: new Date(item.appointmentDate).toLocaleDateString("vi-VN"),

      time: item.appointmentTime,

      showroom: item.showroom,

      status: item.status,

      createdBy: item.createdBy?.username,

      createdAt: new Date(item.createdAt).toLocaleString("vi-VN"),
    });
  });

  sheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.border = {
        top: {
          style: "thin",
        },
        bottom: {
          style: "thin",
        },
        left: {
          style: "thin",
        },
        right: {
          style: "thin",
        },
      };

      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
      };
    });
  });

  return workbook;
};
