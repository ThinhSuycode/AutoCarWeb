import type { Appointment } from "../appointment/appointment.type";
import type { CarType } from "../car/car.type";
import type { UserType } from "../user/user.type";
import type { OrderStatus, PaymentMethod } from "./order.constant";

export interface BuyerSnapshot {
  username: string;
  email: string;
  phone: string;
}

export interface CarSnapshot {
  name: string;
  brand: string;
  color: string;
  year: number;
}

export interface OrderType {
  _id: string;

  orderCode: string;

  buyerId: UserType;

  staffId: UserType;

  carId: CarType;

  appointmentId: Appointment | null;

  quantity: number;

  // Giá niêm yết
  unitPrice: number;

  // Giá bán thực tế
  salePrice: number;

  // Số tiền được giảm
  discount: number;

  deposit: number;

  // VAT (%)
  taxRate: number;

  // Tiền VAT
  tax: number;

  // Thành tiền cuối cùng
  totalAmount: number;

  paymentMethod: PaymentMethod;

  note?: string;

  status: OrderStatus;

  buyerSnapshot: BuyerSnapshot;

  carSnapshot: CarSnapshot;

  completedAt: string | null;

  createdAt: string;

  updatedAt: string;
}
