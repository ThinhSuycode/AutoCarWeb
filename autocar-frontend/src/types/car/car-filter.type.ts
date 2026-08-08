export interface BrandsType {
  id: string;

  title: string;

  value: string;
}

export interface PriceRangeType {
  value: string;

  label: string;
}

export interface FilterOptionsType {
  brands: BrandsType[];

  priceRanges: PriceRangeType[];

  years: string[];

  bodyTypes: string[];

  transmissions: string[];
}
