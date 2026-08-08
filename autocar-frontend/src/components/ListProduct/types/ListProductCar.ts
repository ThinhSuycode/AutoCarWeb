import type { CarType } from "../../../types/car/car.type";

export interface ListCarProps {
  hiddenBtn?: boolean;

  productData?: CarType[] | null;

  heading: string;

  className?: string;

  desc?: string;

  carShow?: boolean;

  filterCar?: boolean | undefined;

  emptyTitle?: string;

  isLoading?: boolean;

  userLayout?: boolean;

  userCarsFilter?: () => void;
}
