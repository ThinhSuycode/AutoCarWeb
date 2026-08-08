import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const userBaseSchema = z.object({
  username: z.string().trim().min(2, "Tên phải có ít nhất 2 ký tự"),

  email: z.string().trim().email("Email không hợp lệ"),

  phone: z
    .string()
    .trim()
    .regex(/^\d{10,11}$/, "Số điện thoại không hợp lệ"),

  address: z.string().trim().min(4, "Địa chỉ quá ngắn"),
});

export const createUserSchema = userBaseSchema.extend({
  role: z.enum(["admin", "staff", "user"]).default("user"),
  password: z
    .string()
    .trim()
    .regex(passwordRegex, "Mật khẩu phải chứa chữ hoa, chữ thường và số"),
});

export const updateUserSchema = userBaseSchema.partial().extend({
  role: z.enum(["admin", "staff", "user"]).default("user"),
  avatar: z.string().optional(),
  password: z
    .string()
    .trim()
    .transform((v) => (v === "" ? undefined : v))
    .optional()
    .refine(
      (v) => !v || passwordRegex.test(v),
      "Mật khẩu phải chứa chữ hoa, chữ thường và số",
    ),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Vui lòng nhập mật khẩu hiện tại"),

    newPassword: z
      .string()
      .min(1, "Vui lòng nhập mật khẩu mới")
      .regex(
        passwordRegex,
        "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số",
      ),

    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "Mật khẩu mới không được trùng mật khẩu hiện tại",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export type ChangePasswordInput = z.input<typeof changePasswordSchema>;
export type ChangePasswordOutput = z.output<typeof changePasswordSchema>;

export type FormInputProfile = z.input<typeof userBaseSchema>;
export type FormOutputProfile = z.output<typeof userBaseSchema>;

export type CreateUserInput = z.input<typeof createUserSchema>;
export type CreateUserOutput = z.output<typeof createUserSchema>;

export type UpdateUserInput = z.input<typeof updateUserSchema>;
export type UpdateUserOutput = z.output<typeof updateUserSchema>;
