import axios from "axios";
import type { AppointmentFormData } from "../schemas/appointment";
import type {
  AppointmentListResponse,
  AppointmentResponse,
} from "../types/appointment/appointment.response";
import { callApi, changeApi } from "./api";
import type { Appointment } from "../types/appointment/appointment.type";

export const appointmentServices = {
  getAll: async (params: {
    page: number;
    limit: number;
    search?: string;
    status?: string;
    sort?: string;
  }) => {
    const query = new URLSearchParams();

    query.append("page", String(params.page));
    query.append("limit", String(params.limit));

    if (params.search) {
      query.append("search", params.search);
    }

    if (params.status) {
      query.append("status", params.status);
    }

    if (params.sort) {
      query.append("sort", params.sort);
    }

    const res = await callApi.getData<AppointmentListResponse>(
      `/appointments?${query.toString()}`,
    );

    return res;
  },

  create: (contactId: string, data: AppointmentFormData) => {
    return changeApi.request<Appointment>(
      "/appointments/contact",
      "add",
      data,
      contactId,
    );
  },

  getMyAppointment: async () => {
    const res =
      await callApi.getData<AppointmentListResponse>("/my-appointments");
    return res.data;
  },

  getDetail: async (id: string) => {
    const res = await callApi.getData<AppointmentResponse>(
      `/appointments/${id}`,
    );
    return res?.data;
  },

  confirm: async (id: string) => {
    return await changeApi.request<Appointment>(
      `/appointments/${id}/confirm`,
      "patch",
    );
  },

  complete: async (id: string) => {
    return await changeApi.request<Appointment>(
      `/appointments/${id}/complete`,
      "patch",
    );
  },

  cancel: (id: string) => {
    return changeApi.request<Appointment>(
      `/appointments/${id}/cancel`,
      "patch",
    );
  },

  exportExcel: async (params: {
    appointmentId?: string;
    search?: string;
    status?: string;
    sort?: string;
  }) => {
    const query = new URLSearchParams();
    if (params.appointmentId) {
      query.append("appointmentId", params.appointmentId);
    }

    if (params.search) {
      query.append("search", params.search);
    }

    if (params.status) {
      query.append("status", params.status);
    }

    if (params.sort) {
      query.append("sort", params.sort);
    }
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_KEYS}/appointments/export?${query.toString()}`,
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  },
  exportExcelById: async (appointmentId: string) => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_KEYS}/appointments/${appointmentId}/export`,
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  },
};
