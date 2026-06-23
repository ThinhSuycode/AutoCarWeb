import { callApi, changeApi } from "./api";
import { type CarDetailsType } from "../types/car";
import type { CarManagerResponse } from "../types/managerStaff";

export const getCarDetail = async (id: string) => {
  return await callApi.getData<CarDetailsType>(`carDetail/${id}`);
};

export const carService = {
  getAll: (params?: string) =>
    callApi.getData(`cars${params ? `?${params}` : ""}`),

  getCarsWithManager: (params?: string) =>
    callApi.getData(`cars/manager/all${params ? `?${params}` : ""}`),

  getMyCars: (params?: string) =>
    callApi.getData<CarManagerResponse>(
      `cars/staff/my-cars${params ? `?${params}` : ""}`,
    ),

  updateManagerStatus: (id: string, managerStatus: string) =>
    changeApi.request<CarManagerResponse>(`/cars/staff/${id}/status`, "patch", {
      managerStatus,
    }),
};
