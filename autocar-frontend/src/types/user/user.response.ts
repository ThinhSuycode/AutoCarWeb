import type { ApiListResponse, ApiResponse } from "../common/response";
import type { UserType } from "./user.type";

export type UserResponse = ApiResponse<UserType>;
export type UserListResponse = ApiListResponse<UserType>;
