import { z } from "zod";

export const MANAGER_STATUS = [
  "pending",
  "received",
  "maintenance",
  "ready",
  "completed",
] as const;

export const carSchema = z.object({
  name: z.string().trim().min(2, "Tên xe tối thiểu 2 ký tự"),

  brand: z.string().min(1, "Vui lòng chọn hãng xe"),

  price: z.coerce.number().min(1, "Giá phải lớn hơn 0"),

  year: z.coerce.number().min(1900, "Năm không hợp lệ"),

  mileage: z.coerce.number().min(0, "Số km không hợp lệ"),

  transmission: z.string().min(1, "Vui lòng chọn hộp số"),

  color: z.string().min(1, "Vui lòng chọn màu xe"),

  image: z.string().url("Link ảnh không hợp lệ"),

  managerStatus: z
    .enum(MANAGER_STATUS)
    .default("pending"),
});

export const updateCarSchema = carSchema.partial();

export const updateManagerStatusSchema = z.object({
  managerStatus: z.enum(MANAGER_STATUS),
});

export type CarFormData = z.infer<typeof carSchema>;

export type ManagerStatus = typeof MANAGER_STATUS[number];

export type UpdateManagerStatusData = z.infer<
  typeof updateManagerStatusSchema
>;