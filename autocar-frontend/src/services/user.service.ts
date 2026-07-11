import type { CreateUserInput, UpdateUserInput } from "../schemas/user.schema";
import type { Contact, FormCarContact } from "../types/contact";
import type { Role } from "../types/menu";
import type { PaginatedResponse } from "../types/pagination";
import type { UserType } from "../types/users";
import { callApi, changeApi } from "./api";

export const updateFavourite = async (id: string, data: UserType) => {
  return changeApi.request<UserType>("users", "patch", data, id);
};

export const updateArticleSave = async (id: string, data: UserType) => {
  return changeApi.request<UserType>("users", "patch", data, id);
};

interface GetAllUserParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}
export const userService = {
  getRoleUser: async (role: Role) => {
    return callApi.getData<PaginatedResponse<UserType>>(`users?role=${role}`);
  },
  postContact: async (id: string, data: FormCarContact) => {
    return changeApi.request<Contact>("contacts", "add", data, id);
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

    const response = await callApi.getData<PaginatedResponse<UserType>>(
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
  deleteUser: async (userId: string) => {
    return changeApi.request<UserType>("users", "delete", undefined, userId);
  },
};
