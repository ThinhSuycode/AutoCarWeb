import { z } from "zod";
import {
  BODY_TYPES,
  CAR_STATUS,
  FUEL,
  MANAGER_STATUS,
  TRANMISSION,
} from "../types/car/car.constant";

export const carFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Tên xe tối thiểu 2 ký tự")
    .max(100, "Tên xe không được vượt quá 100 ký tự"),

  brand: z.string().trim().min(1, "Vui lòng chọn hãng xe"),

  // Giá niêm yết
  price: z.coerce.number().min(100_000_000, "Giá phải lớn hơn 100 triệu"),

  year: z.coerce
    .number()
    .int()
    .min(1900, "Năm không hợp lệ")
    .max(new Date().getFullYear() + 1, "Năm sản xuất không hợp lệ"),

  mileage: z.coerce.number().min(0, "Số km không hợp lệ"),

  bodyType: z
    .array(z.enum(BODY_TYPES))
    .min(1, "Vui lòng chọn ít nhất một loại xe"),

  transmission: z.enum(TRANMISSION, {
    message: "Vui lòng chọn hộp số",
  }),

  fuel: z.enum(FUEL, {
    message: "Vui lòng chọn nhiên liệu",
  }),

  engine: z.string().trim().min(1, "Vui lòng nhập động cơ"),

  seats: z.coerce.number().int().min(2, "Số chỗ ngồi không hợp lệ"),

  color: z.string().trim().min(1, "Vui lòng chọn màu xe"),

  origin: z.string().trim().min(1, "Vui lòng nhập xuất xứ"),

  thumbnail: z.string().url("Link ảnh không hợp lệ"),

  status: z.enum(CAR_STATUS).default("available"),

  managerStatus: z.enum(MANAGER_STATUS).default("pending"),
});

// ===========================
// UPDATE CAR
// ===========================

export const updateCarSchema = carFormSchema
  .omit({
    status: true,
    managerStatus: true,
  })
  .partial();

// ===========================
// UPDATE CAR STATUS
// ===========================

export const updateCarStatusSchema = z.object({
  status: z.enum(CAR_STATUS),
});

// ===========================
// UPDATE MANAGER STATUS
// ===========================

export const updateManagerStatusSchema = z.object({
  managerStatus: z.enum(MANAGER_STATUS),
});

// ===========================
// DTO TYPES
// ===========================

export type CreateCarDto = z.infer<typeof carFormSchema>;

export type UpdateCarDto = z.infer<typeof updateCarSchema>;

export type UpdateCarStatusDto = z.infer<typeof updateCarStatusSchema>;

export type UpdateManagerStatusDto = z.infer<typeof updateManagerStatusSchema>;

export type CarStatus = (typeof CAR_STATUS)[number];

export type ManagerStatus = (typeof MANAGER_STATUS)[number];

export type FuelType = (typeof FUEL)[number];

export type TransmissionType = (typeof TRANMISSION)[number];
