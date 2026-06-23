import type React from "react";
import type { CarFormData } from "../schemas/car.schema";
import type { CarManagerType } from "./managerStaff";

// ───────────────── FILTER ─────────────────

export type BrandsType = {
  id: string;
  title: string;
  value: string;
};

export type PriceRangeType = {
  value: string;
  label: string;
};

export type FilterOptionsType = {
  brands: BrandsType[];
  priceRanges: PriceRangeType[];
  years: string[];
  bodyTypes: string[];
  transmissions: string[];
};

// ───────────────── CAR ─────────────────

export interface CarType extends CarFormData {
  _id: string;

  bodyType?: string;
  fuelType?: string;
  engineSize?: string;
  seats?: number;

  hasWarranty?: boolean;
  isInspected?: boolean;

  features?: string[];
  managerId?: Staff;
  createdAt?: string;
  updatedAt?: string;
}
export interface Staff {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  carCount: number;
  staffInfo?: { department: string; position: string; phone: string };
}
// ───────────────── COLOR ─────────────────

export interface ColorType {
  key: string;
  title: string;
}

// ───────────────── CAR DETAIL ─────────────────

export interface InfoSpecsType {
  label: string;
  value: string;
}

export interface CarSpecGroupType {
  title: string;
  items: InfoSpecsType[];
}

export interface FormCarDetail {
  name: string;
  brand: string;
  price: number;
  year: number;
  mileage: number;

  transmission?: "Số tự động" | "Số sàn";

  location?: string;

  description?: string;

  images: string[];

  features?: string[];

  specs?: CarSpecGroupType[];
}

export interface CarDetailsType extends FormCarDetail {
  carId: CarManagerType;
  createdAt?: string;
  updatedAt?: string;
}
export interface CarResponse {
  data: CarType[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ───────────────── LIST ─────────────────

export interface ListCarType {
  hiddenBtn?: boolean;

  productData?: CarType[] | null;

  heading: string;

  className?: string;

  desc?: string;

  carShow?: boolean;

  filterCar?: boolean;

  emptyTitle?: string;
  isLoading?: boolean;
  userLayout?: boolean;
  userCarsFilter?: () => void;
}

// ───────────────── MODE ─────────────────

export interface ModePropsType {
  icon: React.ReactNode;
  value: string;
}

// ───────────────── API RESPONSE ─────────────────

export interface CarResponse {
  data: CarType[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
