export type AppointmentStatus =
  | "pending" // Chờ xác nhận
  | "confirmed" // Đã xác nhận
  | "completed" // Hoàn thành
  | "cancelled"; // Đã hủy

export type AppointmentType =
  | "test_drive" // Lái thử xe
  | "consultation" // Tư vấn
  | "maintenance" // Bảo dưỡng
  | "inspection"; // Kiểm định

export interface Appointment {
  _id: string;
  type: AppointmentType;
  status: AppointmentStatus;

  // Thông tin xe
  carId: string;
  carName: string;

  // Thông tin lịch hẹn
  date: string; // "20/02/2024"
  time: string; // "09:00"
  location: string; // "AutoViet Sài Gòn - Quận 7"
  note?: string; // Ghi chú

  // Liên kết user
  userId: string;
  managerId?: string; // Nhân viên phụ trách

  createdAt: string;
  updatedAt: string;
}
export interface AppointmentForm {
  name: string;
  phone: string;
  location: string;
  type: string;
  date: string;
  time: string;
  note: string;
}
