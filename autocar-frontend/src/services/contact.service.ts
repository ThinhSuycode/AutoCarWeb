import type { ContactFormData } from "../schemas/contact.schema";
import type { ContactListResponse } from "../types/contact/contact.response";
import type { Contact } from "../types/contact/contact.type";
import type { UpdateContactStatusDto } from "../types/staff/staff-contact.dto";

import { changeApi, callApi } from "./api";

export const contactService = {
  // Tạo contact theo xe
  postContact: (carId: string, data: ContactFormData) =>
    changeApi.request<Contact>(`contacts/${carId}`, "add", data),

  // Tạo contact chung
  postGeneralContact: (data: ContactFormData) =>
    changeApi.request<Contact>("contacts", "add", data),

  // Danh sách contact
  getContactsAll: ({
    search = "",
    page = 1,
    limit = 10,
    status = "",
    buyerId,
    managerId,
    carId,
  }: {
    search?: string;
    page?: number;
    limit?: number;
    status?: string;
    buyerId?: string;
    managerId?: string;
    carId?: string;
  }) => {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (status && status !== "all") {
      params.set("status", status);
    }

    if (buyerId) {
      params.set("buyerId", buyerId);
    }

    if (managerId) {
      params.set("managerId", managerId);
    }

    if (carId) {
      params.set("carId", carId);
    }

    params.set("page", String(page));
    params.set("limit", String(limit));

    return callApi.getData<ContactListResponse>(
      `contacts${params.toString() ? `?${params.toString()}` : ""}`,
    );
  },

  // Chi tiết contact
  getContactById: (id: string) => callApi.getData<Contact>(`contacts/${id}`),

  // Cập nhật trạng thái
  updateContactStatus: (id: string, data: UpdateContactStatusDto) =>
    changeApi.request<Contact>(`contacts/staff/${id}/status`, "patch", data),

  // Phân công nhân viên
  assignContact: (id: string, managerId: string | null) =>
    changeApi.request<Contact>(`contacts/admin/${id}/assign`, "patch", {
      managerId: managerId || null,
    }),

  // Xóa contact
  deleteContact: (id: string) =>
    changeApi.request<void>(`contacts/${id}`, "delete"),
};
