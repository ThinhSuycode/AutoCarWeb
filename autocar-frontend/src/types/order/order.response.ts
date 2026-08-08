import type { ApiListResponse, ApiResponse } from "../common/response";

import type { OrderType } from "./order.type";

export type OrderResponse = ApiResponse<OrderType>;

export type OrderListResponse = ApiListResponse<OrderType>;
