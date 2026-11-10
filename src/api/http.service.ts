import axios from "axios";
import { environment } from "../config/environment";
import type { ApiErrorData, ApiResult } from "../types";

const client = axios.create({
  baseURL: `${environment.apiBaseUrl}/api`,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

export const request = async <T = unknown>(
  method: "GET" | "POST" | "PUT",
  url: string,
  data?: unknown,
): Promise<ApiResult<T>> => {
  try {
    const response = await client.request<ApiResult<T>>({ method, url, data });
    return response.data;
  } catch (error) {
    const response = axios.isAxiosError<{
      message?: string | string[];
      data?: ApiErrorData;
    }>(error)
      ? error.response
      : undefined;
    const message = response?.data?.message;
    return {
      success: false,
      data: response?.data?.data ?? null,
      message: Array.isArray(message)
        ? message.join(" ")
        : message || "An error occurred while processing your request.",
    };
  }
};
