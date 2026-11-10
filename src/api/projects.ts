import { request } from "./http.service";
import { API_ENDPOINTS } from "../config/api.config";
import { JWTConfig, logoutUser } from "../utils/helper";
import type { ApiResult, ReturnProject } from "../types";

const authenticatedRequest = async <T>(
  method: "GET" | "POST",
  url: string,
  data?: unknown,
): Promise<ApiResult<T>> => {
  try {
    const { headers } = await JWTConfig();
    const result = await request<T>(method, url, data, headers);
    if (!result.success && result.statusCode === 401) logoutUser();
    return result;
  } catch {
    return {
      success: false,
      data: null,
      message: "Your session has expired. Please sign in again.",
    };
  }
};

export const getAssignedProjects = () =>
  authenticatedRequest<ReturnProject[]>(
    "GET",
    API_ENDPOINTS.GET_ASSIGNED_PROJECT,
  );

export const assignDemoProject = (payload: { userId?: number }) =>
  authenticatedRequest<unknown>(
    "POST",
    API_ENDPOINTS.ASSIGN_DEMO_PROJECT,
    payload,
  );
