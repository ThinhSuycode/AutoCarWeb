export interface RevenuePoint {
  month: string;
  revenue: number;
  cars: number;
}

export interface AppointmentStatusPoint {
  name: string;
  label: string;
  value: number;
  color: string;
}

export interface CarBrandPoint {
  brand: string;
  count: number;
}

export interface NewUsersPoint {
  day: string;
  users: number;
}
