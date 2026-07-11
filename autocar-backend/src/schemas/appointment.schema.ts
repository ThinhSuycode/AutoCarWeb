import { z } from "zod";

export const appointmentSchema = z.object({
  type: z.enum(["consultation", "test_drive", "maintain"]),

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
