import type { ApiListResponse, ApiResponse } from "../common/response";
import type { Appointment } from "./appointment.type";

export type AppointmentResponse = ApiResponse<Appointment>;

export type AppointmentListResponse = ApiListResponse<Appointment>;
