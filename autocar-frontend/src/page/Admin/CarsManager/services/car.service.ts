import type { CarFormData } from "../../../../schemas/car.schema";
import { callApi, changeApi } from "../../../../services/api";
import type { CarType } from "../../../../types/car";
import type { CarManagerType } from "../../../../types/managerStaff";
import type { PaginatedResponse } from "../../../../types/pagination";

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
};
