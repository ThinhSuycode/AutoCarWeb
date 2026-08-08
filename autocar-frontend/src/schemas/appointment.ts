import { z } from "zod";
import { serviceAppointmentId } from "../constants/serviceData";

export const appointmentSchema = z.object({
  appointmentType: z.enum(serviceAppointmentId),

  appointmentCar: z.string().optional(),

  appointmentDate: z.string().min(1, "Vui lòng chọn ngày"),

  appointmentTime: z.string().min(1, "Vui lòng chọn giờ"),

  showroom: z.enum([
    "AutoViet Hà Nội",
    "AutoViet Đà Nẵng",
    "AutoViet Bình Định",
  ]),

  note: z.string().optional(),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
