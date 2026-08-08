import type { ApiListResponse, ApiResponse } from "../common/response";
import type { Contact } from "./contact.type";

export type ContactResponse = ApiResponse<Contact>;

export type ContactListResponse = ApiListResponse<Contact>;
