export const CAR_STATUS = [
  "available",
  "reserved",
  "sold",
  "maintenance",
] as const;

export const CAR_STATUS_LABEL: Record<CarStatus, string> = {
  available: "Đang bán",
  reserved: "Đã đặt cọc",
  sold: "Đã bán",
  maintenance: "Đang bảo dưỡng",
};
export const MANAGER_STATUS = [
  "pending",
  "received",
  "maintenance",
  "ready",
  "completed",
] as const;

export const BODY_TYPES = [
  "SUV",
  "Sedan",
  "Hatchback",
  "Coupe",
  "Convertible",
  "Pickup",
  "MPV",
  "Crossover",
] as const;

export type ColorType = {
  key: string;
  title: string;
};

export type BodyType = (typeof BODY_TYPES)[number];

export const FUEL = ["Xăng", "Diesel", "Hybrid", "Điện"] as const;

export const TRANMISSION = ["Số tự động", "Số sàn"] as const;

export type Tranmission = (typeof TRANMISSION)[number];

export type CarStatus = (typeof CAR_STATUS)[number];

export type ManagerStatus = (typeof MANAGER_STATUS)[number];
