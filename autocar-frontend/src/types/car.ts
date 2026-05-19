import type React from "react";

export type BrandsType = {
  id: string;
  title: string;
  value: string;
};
export type FilterOptionsType = {
  brands: BrandsType[];
  priceRanges: PriceRangeType[];
  years: string[];
  bodyTypes: string[];
  transmissions: string[];
};
export type PriceRangeType = {
  value: string;
  label: string;
};
export type CarType = {
  id: string;
  name: string;
  brand: string;
  price: number;
  year: number;
  mileage: number;
  transmission: "Số tự động" | "Số sàn";
  image: string;
  hasWarranty?: boolean;
  isInspected?: boolean;
  bodyType?: string;
  fuelType?: string;
  engineSize?: string;
  color: string;
  seats?: number;
  features?: string[];
};
export interface ColorType {
  key: string;
  title: string;
}

export interface CarDetailsType {
  _id: string;
  id: string;
  name: string;
  brand: string;
  price: number;
  year: number;
  mileage: number;
  transmission: "Số tự động" | "Số sàn";
  location: string;
  managerId: string;
  description?: string;
  images: string[];
  features?: string[];
  specs?: CarSpecGroupType[];
}

export interface CarSpecGroupType {
  title: string;
  items: InfoSpecsType[];
}
export interface InfoSpecsType {
  label: string;
  value: string;
}
export interface ListCarType {
  hiddenBtn?: boolean;
  productData?: CarType[] | null;
  heading: string;
  className?: string;
  desc?: string;
  carShow?: boolean;
  filterCar?: boolean;
  emptyTitle?: string;
  userLayout?: boolean;
}

export interface ModePropsType {
  icon: React.ReactNode;
  value: string;
}
