import type { ServiceAppointmentKey } from "../../constants/serviceData";

export interface CreateAppointmentDto {
  contactId: string;

  appointmentType: ServiceAppointmentKey;

  appointmentDate: string;

  appointmentTime: string;

  showroom: string;

  appointmentCar?: string;

  note?: string;
}

export interface UpdateAppointmentDto extends Partial<CreateAppointmentDto> {
  status?: "pending" | "confirmed" | "completed" | "cancelled";
}
