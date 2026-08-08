import type { FuelType, TransmissionType } from "../../schemas/car.schema";
import type { Staff } from "../staff/staff.type";
import type { BodyType, CarStatus, ManagerStatus } from "./car.constant";

export interface CarType {
  _id: string;

  name: string;

  brand: string;

  price: number;

  year: number;

  mileage: number;

  bodyType: BodyType[];

  transmission: TransmissionType;

  fuel: FuelType;

  engine: string;

  seats: number;

  color: string;

  origin: string;

  thumbnail: string;

  status: CarStatus;

  managerStatus: ManagerStatus;

  managerId: Staff | null;

  orderId: string | null;

  soldAt: string | null;

  createdAt: string;

  updatedAt: string;
}
