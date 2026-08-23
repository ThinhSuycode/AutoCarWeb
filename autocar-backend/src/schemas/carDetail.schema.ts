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
  description: z.string().trim().optional(),
  location: z.string().trim().optional(),

  images: z.array(z.string().url("Link ảnh không hợp lệ")).optional(),
  features: z.array(z.string()).optional(),

  specs: z.array(specGroupSchema).optional(),

  hasWarranty: z.boolean().optional(),
  isInspected: z.boolean().optional(),
});

export const createCarDetailSchema = carDetailSchema;

export const updateCarDetailSchema = carDetailSchema
  .omit({ carId: true })
  .partial();

export type CarDetailData = z.infer<typeof carDetailSchema>;
export type CreateCarDetailData = z.infer<typeof createCarDetailSchema>;
export type UpdateCarDetailData = z.infer<typeof updateCarDetailSchema>;
