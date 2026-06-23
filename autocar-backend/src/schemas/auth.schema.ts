import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

export const loginSchema = z.object({
  email: z.email("Định dạng email không hợp lệ"),

  password: z
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .regex(passwordRegex, "Mật khẩu phải chứa chữ hoa, chữ thường và số"),
});

export const registerSchema = z.object({
  username: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),

  email: z.email("Định dạng email không hợp lệ"),

  phone: z
    .string()
    .regex(
      /^0\d{9}$/,
      "Số điện thoại phải bắt đầu bằng 0 và gồm đúng 10 chữ số",
    ),

  password: z
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .regex(passwordRegex, "Mật khẩu phải chứa chữ hoa, chữ thường và số"),
});

export const googleLoginSchema = z.object({
  credential: z.string().min(1, "Thiếu credential"),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, "Mật khẩu hiện tại không hợp lệ"),

    newPassword: z
      .string()
      .min(8, "Mật khẩu mới phải có ít nhất 8 ký tự")
      .regex(passwordRegex, "Mật khẩu phải chứa chữ hoa, chữ thường và số"),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "Mật khẩu mới không được trùng mật khẩu cũ",
    path: ["newPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.email("Email không hợp lệ"),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token không hợp lệ"),

  password: z
    .string()
    .min(8, "Mật khẩu phải ít nhất 8 ký tự")
    .regex(passwordRegex, "Mật khẩu phải chứa chữ hoa, chữ thường và số"),
});
