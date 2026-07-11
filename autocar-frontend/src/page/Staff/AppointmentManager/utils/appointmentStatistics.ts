import type { Appointment } from "../../../../types/appointment";

export const appointmentStatistics = (appointments: Appointment[]) => {
  return {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    completed: appointments.filter((a) => a.status === "completed").length,
    cancelled: appointments.filter((a) => a.status === "cancelled").length,
  };
};

export type AppointmentStatisticsType = ReturnType<
  typeof appointmentStatistics
>;
