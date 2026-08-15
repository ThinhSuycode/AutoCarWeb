import type { ApiListResponse, ApiResponse } from "../common/response";
import type { PaymentType } from "./payment.type";

export type PaymentResponse = ApiResponse<PaymentType>;

export type PaymentListResponse = ApiListResponse<PaymentType>;
