export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export interface Appointment {
  _id: string;

  contactId: {
    _id: string;
    name: string;
    phone: string;
    carName?: string;
    carBrand?: string;
    status: string;
  };

  customerName: string;

  phone: string;

  showroom: string;

  appointmentDate: string;

  note?: string;

  status: AppointmentStatus;

  createdBy: {
    _id: string;
    username: string;
    email: string;
  };

  createdAt: string;
  updatedAt: string;
}
