import { z } from "zod";

export const carSchema = z.object({
  name: z.string().trim().min(2, "Tên xe tối thiểu 2 ký tự"),

  brand: z.string().min(1, "Vui lòng chọn hãng xe"),

  price: z.coerce.number().min(100000000, "Giá phải lớn hơn 100 triệu"),

  year: z.coerce.number().min(1900, "Năm không hợp lệ"),

  mileage: z.coerce.number().min(0, "Số km không hợp lệ"),

  transmission: z.enum(["Số tự động", "Số sàn"], {
    message: "Vui lòng chọn hộp số",
  }),

  color: z.string().min(1, "Vui lòng chọn màu xe"),

  image: z.string().url("Link ảnh không hợp lệ"),
});

export type CarFormData = z.infer<typeof carSchema>;
