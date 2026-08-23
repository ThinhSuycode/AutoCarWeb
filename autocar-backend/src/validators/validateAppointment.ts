import { appointmentSchema } from "../schemas/appointment.schema";
import { validateWithSchema } from "../utils/validateWithSchema";

export const validateCreateAppointment = (data: unknown) =>
  validateWithSchema(appointmentSchema, data);
