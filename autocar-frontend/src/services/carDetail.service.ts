import type {
  CarDetailFormType,
  UpdateCarDetailDto,
} from "../schemas/carDetail.schema";
import type { CarDetailsType } from "../types/car/car-detail.type";
import { callApi, changeApi } from "./api";

export const carDetailsService = {
  getAll: async () => {
    return await callApi.getData<CarDetailsType>("carDetail?all=true");
  },

  getDetail: async (id: string) => {
    return await callApi.getData<CarDetailsType>(`carDetail/${id}`);
  },

  create: async (data: CarDetailFormType) => {
    return await changeApi.request<CarDetailsType>("carDetail", "add", data);
  },

  update: async (id: string, data: UpdateCarDetailDto) => {
    return await changeApi.request<CarDetailsType>(
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
