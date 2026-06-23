import { z } from "zod";

const specItemSchema = z.object({
  label: z.string().min(1, "Vui lòng nhập tên thông số"),
  value: z.string().min(1, "Vui lòng nhập giá trị"),
});

const specGroupSchema = z.object({
  title: z.string().min(1, "Vui lòng nhập tiêu đề"),
  items: z.array(specItemSchema),
});

export const carDetailSchema = z.object({
  name: z.string().trim().min(2, "Tên xe tối thiểu 2 ký tự"),

  brand: z.string().min(1, "Vui lòng chọn hãng xe"),

  price: z.coerce.number().min(100000000, "Giá phải lớn hơn 100 triệu"),

  year: z.coerce
    .number()
    .min(1900, "Năm không hợp lệ")
    .max(new Date().getFullYear() + 1, "Năm không hợp lệ"),

  mileage: z.coerce.number().min(0, "Số km không hợp lệ"),

  transmission: z.enum(["Số tự động", "Số sàn"], {
    message: "Vui lòng chọn hộp số",
  }),

  location: z.string().trim().min(2, "Vui lòng cập nhật địa chỉ").optional(),

  images: z
    .array(z.string().url("Link ảnh không hợp lệ"))
    .min(1, "Vui lòng thêm ít nhất 1 ảnh"),
  description: z.string().trim().min(10, "Mô tả tối thiểu 10 ký tự").optional(),

  features: z.array(z.string()).optional(),

  specs: z.array(specGroupSchema).optional(),

  hasWarranty: z.boolean().optional(),

  isInspected: z.boolean().optional(),
});

export type CarDetailFormData = z.infer<typeof carDetailSchema>;
