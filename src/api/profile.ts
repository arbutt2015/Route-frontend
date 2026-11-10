import { request } from "./http.service";
import { API_ENDPOINTS } from "../config/api.config";
import { JWTConfig, logoutUser } from "../utils/helper";
import type { ApiResult, ProfileValues, UserProfile } from "../types";

const authenticatedRequest = async <T>(
  method: "GET" | "PATCH" | "PUT",
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

export const getMyProfile = () =>
  authenticatedRequest<UserProfile>("GET", API_ENDPOINTS.PROFILE);

export const updateMyProfile = (values: ProfileValues) =>
  authenticatedRequest<UserProfile>("PATCH", API_ENDPOINTS.PROFILE, values);

export const changeMyPassword = (values: {
  currentPassword: string;
  newPassword: string;
}) =>
  authenticatedRequest<null>("PUT", API_ENDPOINTS.CHANGE_PASSWORD, {
    previousPassword: values.currentPassword,
    proposedPassword: values.newPassword,
  });
