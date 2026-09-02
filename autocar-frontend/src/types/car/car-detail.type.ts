import type { CarType } from "./car.type";

export interface InfoSpecsType {
  label: string;

  value: string;
}

export interface CarSpecGroupType {
  title: string;

  items: InfoSpecsType[];
}

export interface FormCarDetail {
  location?: string;

  images: string[];

  description?: string;

  hasWarranty?: boolean;

  isInspected?: boolean;

  features?: string[];

  specs?: CarSpecGroupType[];
}

export interface CarDetailsType extends FormCarDetail {
  carId: CarType;

  createdAt?: string;

  updatedAt?: string;
}
