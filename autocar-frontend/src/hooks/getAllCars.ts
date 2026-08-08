import type { CarType } from "../types/car/car.type";

export const getCarNameAll = (cars: CarType[]) => {
  return cars ? cars?.map((item: CarType) => item.name) : cars;
};
