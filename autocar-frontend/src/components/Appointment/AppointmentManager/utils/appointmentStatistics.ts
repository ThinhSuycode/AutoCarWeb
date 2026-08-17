import type { Appointment } from "../../../../types/appointment/appointment.type";

export const appointmentStatistics = (appointments: Appointment[]) => {
  const total = appointments.length;

  const pending = appointments.filter(
    (item) => item.status === "pending",
  ).length;

  const confirmed = appointments.filter(
    (item) => item.status === "confirmed",
  ).length;

  const completed = appointments.filter(
    (item) => item.status === "completed",
  ).length;

  const cancelled = appointments.filter(
    (item) => item.status === "cancelled",
  ).length;

  return {
    total,
    pending,
    confirmed,
    completed,
    cancelled,
    completionRate: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
};

export type AppointmentStatisticsType = ReturnType<
  typeof appointmentStatistics
>;
