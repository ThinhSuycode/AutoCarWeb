import type { Appointment } from "../appointment/appointment.type";
import type { UserType } from "../user/user.type";

export interface DashboardStats {
  totalCars: number;
  totalUsers: number;
  totalStaff: number;
  totalArticles: number;
  totalAppointments: number;
  pendingAppointments: number;
  recentAppointments: Appointment[];
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
}
