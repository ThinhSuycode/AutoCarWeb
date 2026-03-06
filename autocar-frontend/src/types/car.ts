import type React from "react";
import type { ReactNode } from "react";

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
export interface CarDetailsType {
  id: string;
  name: string;
  brand: string;
  price: number;
  year: number;
  mileage: number;
  transmission: string;
  location: string;
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
  productsData: CarType[] | [];
  hiddenBtn?: boolean;
  heading: string;
  className?: string;
  desc?: string;
  filterCar?: boolean;
}

export interface ModePropsType {
  icon: React.ReactNode;
  value: string;
}
