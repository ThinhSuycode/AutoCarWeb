import { z } from "zod";

export const appointmentSchema = z.object({
  appointmentType: z.string(),

  appointmentDate: z.string().min(1, "Vui lòng chọn ngày"),
  appointmentCar: z.string().optional(),
  appointmentTime: z.string().min(1, "Vui lòng chọn giờ"),

  showroom: z.enum([
    "AutoViet Hà Nội",
    "AutoViet Đà Nẵng",
    "AutoViet Bình Định",
  ]),

  note: z.string().optional(),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
