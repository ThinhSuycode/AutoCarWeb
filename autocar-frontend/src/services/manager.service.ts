import type {
  AssignManagerPayload,
  GetAllCarsQuery,
} from "../page/Admin/AssignManager/types/assignManagerType";
import type { ManagerCarsListResponse } from "../types/user/manager.response";
import { callApi, changeApi } from "./api";

interface CarManagerStaffType {
  search: string;
  page?: number;
  limit?: number;
  managerStatus?: string;
}

export const managerStaffServices = {
  getMyCars: async ({
    search,
    page = 1,
    limit = 10,
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

    return callApi.getData<ManagerCarsListResponse>(
      `/cars/staff/my-cars?${params.toString()}`,
    );
  },

  updateManagerStatus: (id: string, managerStatus: string) => {
    return changeApi.request<ManagerCarsListResponse>(
      `/cars/staff/${id}/status`,
      "patch",
      {
        managerStatus,
      },
    );
  },
};

export const managerAdminServices = {
  getAllCar: async ({
    page = 1,
    limit = 10,
    hasManager = "all",
  }: GetAllCarsQuery): Promise<ManagerCarsListResponse> => {
    const params = new URLSearchParams();

    if (hasManager !== "all") {
      params.set("hasManager", hasManager);
    } else {
      params.set("page", String(page));
      params.set("limit", String(limit));
    }

    return callApi.getData<ManagerCarsListResponse>(
      `/cars/admin/all?${params.toString()}`,
    );
  },

  assignManager: ({ carId, managerId }: AssignManagerPayload) => {
    return changeApi.request(`/cars/${carId}/assign`, "patch", {
      managerId,
    });
  },

  removeManager: (carId: string) => {
    return changeApi.request(`/cars/${carId}/unassign`, "patch");
  },
};
