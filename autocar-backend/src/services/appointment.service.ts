import ExcelJS from "exceljs";
import { Appointment } from "../models/appoinment.model";

interface ExportAppointmentParams {
  appointmentId?: string;
  search?: string;
  status?: string;
  sort?: string;
}

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
