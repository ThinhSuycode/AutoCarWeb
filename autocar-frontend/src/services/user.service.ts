import type {
  CreateUserInput,
  FormInputProfile,
  UpdateUserInput,
} from "../schemas/user.schema";
import type { Role } from "../types/common/role.type";
import type { CreateContactDto } from "../types/contact/contact.dto";
import type { Contact } from "../types/contact/contact.type";
import type { StaffListResponse } from "../types/user/manager.response";
import type {
  UserListResponse,
  UserResponse,
} from "../types/user/user.response";
import type { UserType } from "../types/user/user.type";

import { callApi, changeApi } from "./api";

export const updateFavourite = async (id: string, carId: string) => {
  return changeApi.request<UserResponse>(`users/${id}/favourite`, "patch", {
    carId,
  });
};

export const updateArticleSave = async (id: string, articleId: string) => {
  return changeApi.request<UserResponse>(`users/${id}/article`, "patch", {
    articleId,
  });
};

interface GetAllUserParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}
export const userService = {
  getRoleUser: async (role: Role) => {
    return callApi.getData<UserListResponse>(`users?role=${role}`);
  },
  postContact: async (id: string, data: CreateContactDto) => {
    return changeApi.request<Contact>("contacts", "add", data, id);
  },

  getAllStaff: () => {
    return callApi.getData<StaffListResponse>("/cars/admin/getStaff");
  },

  getAllUser: async ({
    page = 1,
    limit = 9,
    search = "",
    role = "",
  }: GetAllUserParams) => {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.set("page", String(page));
      params.set("limit", String(limit));
    }

    if (role) {
      params.set("role", role);
    }

    const response = await callApi.getData<UserListResponse>(
      `users?${params.toString()}`,
    );

    return response;
  },
  postUser: async (data: CreateUserInput) => {
    return changeApi.request<UserType>("users", "add", data);
  },
  updateUser: async (userId: string, data: UpdateUserInput) => {
    return changeApi.request<UserType>("users", "patch", data, userId);
  },
  updateProfile: async (id: string | undefined, data: FormInputProfile) => {
    return await changeApi.request<UserType>(`users/${id}`, "patch", data);
  },
  deleteUser: async (userId: string) => {
    return changeApi.request<UserType>("users", "delete", undefined, userId);
  },
};
