import { z } from "zod";

const specItemSchema = z.object({
  label: z.string().min(1, "Tên thông số không được để trống"),

  value: z.string().min(1, "Giá trị không được để trống"),
});

const specGroupSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống"),

  items: z.array(specItemSchema),
});

export const carDetailSchema = z.object({
  carId: z.string().min(1, "Thiếu carId"),

  name: z.string().trim().min(2, "Tên xe tối thiểu 2 ký tự"),

  brand: z.string().min(1, "Vui lòng chọn hãng xe"),

  price: z.number().min(100000000, "Giá phải lớn hơn 100 triệu"),

  year: z
    .number()
    .min(1900, "Năm không hợp lệ")
    .max(new Date().getFullYear() + 1, "Năm không hợp lệ"),

  mileage: z.number().min(0, "Số km không hợp lệ"),

  transmission: z.enum(["Số tự động", "Số sàn"], {
    message: "Vui lòng chọn hộp số",
  }),
  description: z.string().trim().optional(),
  location: z.string().trim().optional(),

  images: z.array(z.string().url("Link ảnh không hợp lệ")).optional(),
  features: z.array(z.string()).optional(),

  specs: z.array(specGroupSchema).optional(),

  hasWarranty: z.boolean().optional(),

  isInspected: z.boolean().optional(),
});

export const updateCarDetailSchema = carDetailSchema.partial();

export type CarDetailData = z.infer<typeof carDetailSchema>;
