import type { Article } from "../article/article.type";
import type { CarType } from "../car/car.type";

export interface UserType {
  _id?: string;
  address?: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  username: string | undefined;
  password: string | undefined;
  avatar?: string;
  role?: "admin" | "user" | "staff";
  favouriteCar?: CarType[];
  articleSave?: Article[];
  appointmentSchedule: string[];
  loginType: string;
}
