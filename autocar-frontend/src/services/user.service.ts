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

export const userService = {
  getRoleUser: async (role: Role) => {
    return callApi.getData<PaginatedResponse<UserType>>(`users?role=${role}`);
  },
  postContact: async (id: string, data: FormCarContact) => {
    return changeApi.request<Contact>("contacts", "add", data, id);
  },
};
