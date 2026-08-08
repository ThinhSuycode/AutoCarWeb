import type { CarType } from "../car/car.type";
import type { UserType } from "../user/user.type";
import type { ContactStatus } from "./contact.constant";

export interface Contact {
  _id: string;

  name: string;

  phone: string;

  message: string;

  notes?: string;

  status: ContactStatus;

  carName: string;

  carBrand: string;

  carPrice: number;

  buyerId?: UserType;

  managerId?: UserType;

  carId?: CarType;

  createdAt: string;

  updatedAt: string;
}
