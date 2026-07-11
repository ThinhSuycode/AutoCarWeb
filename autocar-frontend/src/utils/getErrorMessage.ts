import { AxiosError } from "axios";
import type { ApiErrorResponse } from "../types/api";

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    return (
      (error.response?.data as ApiErrorResponse | undefined)?.message ??
      "Đã xảy ra lỗi."
    );
  }

  return "Đã xảy ra lỗi.";
}
