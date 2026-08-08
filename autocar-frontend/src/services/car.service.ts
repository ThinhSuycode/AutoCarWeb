import { callApi, changeApi } from "./api";
import type { CarDetailsType } from "../types/car/car-detail.type";
import type { CarListResponse } from "../types/car/car.response";
import type { CarType } from "../types/car/car.type";
import type { ManagerCar } from "../types/user/manager-cars.type";
import type { CreateCarDto, UpdateCarDto } from "../schemas/car.schema";

export const getCarDetail = async (id: string) => {
  return callApi.getData<CarDetailsType>(`carDetail/${id}`);
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
  }): Promise<CarListResponse> => {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("all", "true");
      params.set("search", search);
    } else {
      params.set("page", String(page));
      params.set("limit", String(limit));
    }

    return callApi.getData<CarListResponse>(`/cars?${params.toString()}`);
  },

  getCars: async () => {
    return await callApi.getData<CarListResponse>("/cars?all=true");
  },

  getDetail: (id: string) => {
    return callApi.getData<CarType>(`cars/${id}`);
  },

  create: (data: CreateCarDto) => {
    return changeApi.request<ManagerCar>("cars", "add", data);
  },

  update: (id: string, data: UpdateCarDto) => {
    return changeApi.request<CarType>("cars", "patch", data, id);
  },

  delete: (id: string) => {
    return changeApi.request("cars", "delete", undefined, id);
  },

  getCarsWithManager: (params?: string) => {
    return callApi.getData(`cars/manager/all${params ? `?${params}` : ""}`);
  },
};
