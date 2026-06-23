import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

export const loginSchema = z.object({
  email: z.email("Email không hợp lệ"),

  password: z
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .regex(passwordRegex, "Mật khẩu phải chứa chữ hoa, chữ thường và số"),
});

export const registerSchema = z
  .object({
    username: z.string().min(2, "Tên đăng nhập phải ít nhất 2 kí tự"),

    email: z.email("Email không hợp lệ"),

    password: z
      .string()
      .min(8, "Mật khẩu phải ít nhất 8 kí tự")
      .regex(passwordRegex, "Mật khẩu phải chứa chữ hoa, chữ thường và số"),

    confirmPassword: z.string(),

    phone: z
      .string()
      .regex(
        /^0\d{9}$/,
        "Số điện thoại phải bắt đầu bằng 0 và gồm đúng 10 chữ số",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu nhập lại không khớp",
    path: ["confirmPassword"],
  });

export type FormRegisterSchemaType = z.infer<typeof registerSchema>;
export type RegisterPayloadSchemaType = Omit<
  FormRegisterSchemaType,
  "confirmPassword"
>;

export type LoginFormData = z.infer<typeof loginSchema>;
