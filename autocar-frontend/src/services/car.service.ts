import { callApi, changeApi } from "./api";
import { type CarDetailsType, type CarType } from "../types/car";
import type { CarManagerResponse, CarManagerType } from "../types/managerStaff";
import type { CarFormData } from "../schemas/car.schema";
import type { PaginatedResponse } from "../types/pagination";

export const getCarDetail = async (id: string) => {
  return await callApi.getData<CarDetailsType>(`carDetail/${id}`);
};

export const carService = {
  getAll: async ({
    page = 1,
    limit = 9,
    search = "",
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedResponse<CarManagerType>> => {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("all", "true");
      params.set("search", search);
    } else {
      params.set("page", String(page));
      params.set("limit", String(limit));
    }

    const res = await callApi.getData<PaginatedResponse<CarManagerType>>(
      `/cars?${params.toString()}`,
    );

    return res;
  },
  getDetail: async (id: string) => {
    return await callApi.getData<CarType>(`cars/${id}`);
  },

  create: async (data: CarFormData) => {
    return await changeApi.request<CarManagerType>("cars", "add", data);
  },

  update: async (id: string, data: CarType) => {
    return await changeApi.request<CarType>("cars", "patch", data, id);
  },

  delete: async (id: string) => {
    return await changeApi.request("cars", "delete", undefined, id);
  },

  getCarsWithManager: (params?: string) =>
    callApi.getData(`cars/manager/all${params ? `?${params}` : ""}`),
};

interface CarManagerStaffType {
  search: string;
  page?: number;
  limit?: number;
  managerStatus?: string;
}

export const managerStaffServices = {
  getMyCars: async ({
    search,
    page,
    limit,
    managerStatus,
  }: CarManagerStaffType) => {
    const params = new URLSearchParams();
    if (search.trim()) {
      params.set("all", "true");
      params.set("search", search);
    } else {
      params.set("page", String(page));
      params.set("limit", String(limit));
    }
    if (managerStatus && managerStatus !== "all") {
      params.set("managerStatus", managerStatus);
    }
    const res = await callApi.getData<CarManagerResponse>(
      `cars/staff/my-cars?${params ? params.toString() : ""}`,
    );
    return res;
  },
  updateManagerStatus: (id: string, managerStatus: string) =>
    changeApi.request<CarManagerResponse>(`/cars/staff/${id}/status`, "patch", {
      managerStatus,
    }),
};

export const managerAdminServices = {
  getAllCar: async () => {},
};
