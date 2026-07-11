import type { STAFF_STATUS_CONTACT } from "../page/Staff/MyContact/constants/statusLabelData";
import type { Staff } from "./car";

export type CONTACT_STATUS =
  | "new"
  | "assigned"
  | "contacted"
  | "appointment_created"
  | "completed"
  | "cancelled";

export interface Contact {
  _id: string;
  // Thông tin người liên hệ
  name: string;
  phone: string;
  message?: string;

  // Liên kết xe & người bán
  carId: string;
  carName: string;
  carBrand: string;
  sellerId: string;

  // Người gửi (nếu đã đăng nhập)
  buyerId?: string;
  managerId?: Staff;
  status: CONTACT_STATUS;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormCarContact {
  name: string;
  phone: string;
  message: string;
}

export interface BannerContact {
  icon: string;
  heading: string;
  desc: {
    desc1: string;
    desc2: string;
  };
}

export interface QuestionContact {
  title: string;
  content: string;
}

export interface ContactPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ContactListResponse {
  data: Contact[];
  pagination: ContactPagination;
}

export interface UpdateContactStatusPayload {
  status: STAFF_STATUS_CONTACT;
  // notes?: string;
}

export interface AssignContactPayload {
  managerId: string;
}
