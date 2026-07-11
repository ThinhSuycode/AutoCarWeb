import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const userBaseSchema = z.object({
  username: z.string().trim().min(2, "Tên phải có ít nhất 2 ký tự"),

  email: z.string().trim().email("Email không hợp lệ"),

  phone: z
    .string()
    .trim()
    .regex(/^\d{10,11}$/, "Số điện thoại không hợp lệ"),

  address: z.string().trim().min(4, "Địa chỉ quá ngắn vui lòng nhập đầy đủ"),

  role: z.enum(["admin", "staff", "user"]),
});

export const createUserSchema = userBaseSchema.extend({
  password: z
    .string()
    .trim()
    .regex(passwordRegex, "Mật khẩu phải chứa chữ hoa, chữ thường và số"),
});

export const updateUserSchema = userBaseSchema.partial().extend({
  avatar: z.string().optional(),
  password: z
    .union([
      z.literal(""),
      z
        .string()
        .trim()
        .regex(passwordRegex, "Mật khẩu phải chứa chữ hoa, chữ thường và số"),
    ])
    .optional(),
});
