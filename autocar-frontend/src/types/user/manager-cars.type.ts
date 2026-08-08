import type { ManagerStatus } from "../car/car.constant";
import type { CarType } from "../car/car.type";

export interface ManagerCar extends CarType {
  managerStatus: ManagerStatus;
  carCount?: number;
}
