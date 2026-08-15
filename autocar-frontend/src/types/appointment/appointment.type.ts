import type { ServiceAppointmentKey } from "../../constants/serviceData";
import type { CarType } from "../car/car.type";
import type { Contact } from "../contact/contact.type";
import type { OrderType } from "../order/order.type";
import type { AppointmentStatus } from "./appointment.constant";

export interface Appointment {
  _id: string;

  contactId: Contact;

  appointmentType: ServiceAppointmentKey;

  appointmentTime: string;

  appointmentDate: string;

  showroom: string;

  appointmentCar?: CarType;

  note?: string;

  status: AppointmentStatus;

  orderId: OrderType;

  createdBy: {
    _id: string;
    username: string;
    email: string;
  };

  createdAt: string;

  updatedAt: string;
}
