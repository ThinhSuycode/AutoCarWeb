import { z } from "zod";

export const specItemSchema = z.object({
  label: z.string().trim().min(1, "Vui lòng nhập tên thông số"),

  value: z.string().trim().min(1, "Vui lòng nhập giá trị"),
});

export const specGroupSchema = z.object({
  title: z.string().trim().min(1, "Vui lòng nhập tiêu đề"),

  items: z.array(specItemSchema).min(1, "Vui lòng thêm ít nhất một thông số"),
});

export const carDetailSchema = z.object({
  carId: z.string().min(1, "Thiếu carId!"),

  location: z.string().trim().min(2, "Vui lòng cập nhật địa chỉ").optional(),

  images: z
    .array(z.string().url("Link ảnh không hợp lệ"))
    .min(1, "Vui lòng thêm ít nhất 1 ảnh"),

  description: z.string().trim().min(10, "Mô tả tối thiểu 10 ký tự").optional(),
  hasWarranty: z.boolean().default(false).optional(),

  isInspected: z.boolean().default(false).optional(),

  features: z.array(z.string().trim()).default([]),

  specs: z.array(specGroupSchema).default([]),
});

export const createCarDetailSchema = carDetailSchema
  .omit({
    carId: true,
  })
  .partial();
export const updateCarDetailSchema = carDetailSchema.partial();

export type CreateCarDetailDto = z.infer<typeof createCarDetailSchema>;

export type CarDetailFormType = z.infer<typeof carDetailSchema>;

export type UpdateCarDetailDto = z.infer<typeof updateCarDetailSchema>;

export type SpecGroupDto = z.infer<typeof specGroupSchema>;

export type SpecItemDto = z.infer<typeof specItemSchema>;
