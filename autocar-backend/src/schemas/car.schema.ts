import { z } from "zod";

export const MANAGER_STATUS = [
  "pending",
  "received",
  "maintenance",
  "ready",
  "completed",
] as const;

export const CAR_STATUS = [
  "available",
  "reserved",
  "sold",
  "maintenance",
] as const;

export const TRANSMISSION = ["Số tự động", "Số sàn"] as const;

export const FUEL = ["Xăng", "Diesel", "Hybrid", "Điện"] as const;

export const createCarSchema = z.object({
  name: z.string().trim().min(2).max(100),

  brand: z.string().trim().min(1),

  price: z.coerce.number().min(100_000_000),

  year: z.coerce
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1),

  mileage: z.coerce.number().min(0),

  transmission: z.enum(TRANSMISSION),

  bodyType: z.array(z.string()).min(1),

  fuel: z.enum(FUEL),

  engine: z.string().trim().min(1),

  seats: z.coerce.number().int().min(2),

  color: z.string().trim().min(1),

  origin: z.string().trim().min(1),

  thumbnail: z.string().url(),

  status: z.enum(CAR_STATUS).default("available"),

  managerStatus: z.enum(MANAGER_STATUS).default("pending"),
});

export const updateCarSchema = createCarSchema
  .omit({
    status: true,
    managerStatus: true,
  })
  .partial();

export const updateCarStatusSchema = z.object({
  status: z.enum(CAR_STATUS),
});

export const updateManagerStatusSchema = z.object({
  managerStatus: z.enum(MANAGER_STATUS),
});

// DTO
export type CreateCarDto = z.infer<typeof createCarSchema>;

export type UpdateCarDto = z.infer<typeof updateCarSchema>;

export type UpdateCarStatusDto = z.infer<typeof updateCarStatusSchema>;

export type UpdateManagerStatusDto = z.infer<typeof updateManagerStatusSchema>;

export type ManagerStatusType = (typeof MANAGER_STATUS)[number];
