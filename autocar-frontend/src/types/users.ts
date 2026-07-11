import type { PaginationMeta } from "./pagination";

export interface UserType {
  _id?: string;
  address?: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  username: string | undefined;
  password: string | undefined;
  avatar?: string;
  role?: "admin" | "user" | "staff";
  favouriteCar?: string[];
  appointmentSchedule?: [];
  articleSave?: string[];
  loginType: string;
}


export interface UserResponse {
  data: UserType;
  pagination: PaginationMeta;
}
