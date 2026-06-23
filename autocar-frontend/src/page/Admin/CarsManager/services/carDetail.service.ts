import type { CarDetailFormData } from "../../../../schemas/carDetail.schema";
import { callApi, changeApi } from "../../../../services/api";
import type { CarDetailsType } from "../../../../types/car";

export const carDetailsService = {
  getAll: async () => {
    return await callApi.getData<CarDetailsType>("carDetail?all=true");
  },

  getDetail: async (id: string) => {
    return await callApi.getData<CarDetailsType>(`carDetail/${id}`);
  },

  create: async (data: CarDetailsType) => {
    return await changeApi.request<CarDetailsType>("carDetail", "add", data);
  },

  update: async (id: string, data: CarDetailFormData) => {
    return await changeApi.request<CarDetailFormData>(
      "carDetail",
      "patch",
      data,
      id,
    );
  },

  delete: async (id: string) => {
    return await changeApi.request("carDetail", "delete", undefined, id);
  },
};
