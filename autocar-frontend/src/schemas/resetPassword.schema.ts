import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Mật khẩu tối thiểu 8 ký tự")
      .regex(passwordRegex, "Mật khẩu phải chứa chữ hoa, chữ thường và số"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu xác nhận không khớp",
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
