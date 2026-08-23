import type { Appointment } from "../appointment/appointment.type";
import type { UserType } from "../user/user.type";

export interface AdminDashboardStats {
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

export interface TodayAppointmentItem {
  _id: string;
  appointmentDate: string;
  appointmentTime: string;
  showroom: string;
  appointmentCar?: { name: string; brand: string; thumbnail?: string };
  contactId?: {
    buyerId?: { username: string; phone?: string };
  };
}

export interface NewContactItem {
  _id: string;
  name: string;
  phone: string;
  carName?: string;
  createdAt: string;
}

export interface PendingInspectionCarItem {
  _id: string;
  name: string;
  brand: string;
  thumbnail?: string;
  managerStatus: string;
}

export interface RecentOrderItem {
  _id: string;
  orderCode: string;
  carSnapshot: { name: string; brand: string };
  buyerSnapshot: { username: string };
  totalAmount: number;
  status: string;
  createdAt: string;
}

export interface StatusCount {
  _id: string;
  count: number;
}

export interface StaffDashboardStats {
  assignedCars: number;
  activeContacts: number;
  todayAppointments: number;
  monthlyOrders: number;
  monthlyRevenue: number;

  todayAppointmentsList: TodayAppointmentItem[];
  newContactsList: NewContactItem[];
  pendingInspectionList: PendingInspectionCarItem[];

  carsByManagerStatus: StatusCount[];
  contactsByStatus: StatusCount[];

  recentOrders: RecentOrderItem[];
}
