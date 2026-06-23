import { z } from "zod";

const phoneRegex = /^(0|\+84)[0-9]{9}$/;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Họ và tên tối thiểu 2 ký tự"),

  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Số điện thoại không hợp lệ (VD: 0912345678)"),

  message: z.string().trim().min(1, "Vui lòng nhập lời nhắn"),

  // Optional — gắn thêm khi liên hệ về xe
  carName: z.string().optional(),
  carBrand: z.string().optional(),
  carPrice: z.number().optional(),
  notes: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
