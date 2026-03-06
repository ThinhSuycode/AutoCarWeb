export interface CustomerType {
  id?: string;
  address?: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  username: string | undefined;
  password: string | undefined;
  avatar?: string;
  favouriteCar?: string[];
  appointmentSchedule?: [];
}
