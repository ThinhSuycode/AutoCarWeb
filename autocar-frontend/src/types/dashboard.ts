import type { UserType } from "./users";

export interface DashboardStats {
  totalCars: number;
  totalUsers: number;
  totalStaff: number;
  totalArticles: number;
  totalAppointments: number;
  pendingAppointments: number;
  recentAppointments: AppointmentType[];
  recentUsers: UserType[];
}
// ─── Types ────────────────────────────────────────────────────────────────────
export interface AppointmentType {
  _id: string;
  name: string;
  phone: string;
  carName: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  type: string;
  userId?: { username: string; email: string };
}

export interface DashboardResponse {
  success: boolean;
  data: {
    totalCars: number;
    totalUsers: number;
    totalStaff: number;
    totalArticles: number;
    totalAppointments: number;
    pendingAppointments: number;
    recentAppointments: AppointmentType[];
    recentUsers: UserType[];
    charts: {
      appointmentStatusStats: {
        _id: string;
        value: number;
      }[];

      carBrandStats: {
        _id: string;
        count: number;
      }[];

      newUsersStats: {
        _id: number;
        users: number;
      }[];

      revenueStats: {
        _id: {
          month: number;
        };

        revenue: number;

        cars: number;
      }[];
    };
  };
}
