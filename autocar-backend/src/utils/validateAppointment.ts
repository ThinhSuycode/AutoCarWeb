import { appointmentSchema } from "../schemas/appointment.schema";
import { AppError } from "./AppError";

export const validateCreateAppointment = (data: unknown) => {
  const result = appointmentSchema.safeParse(data);

  if (!result.success) {
    const message = result.error.issues.map((err) => err.message).join(", ");

    throw new AppError(message, 400);
  }

  return result.data;
};
