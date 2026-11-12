import { request } from "./http.service";
import { API_ENDPOINTS } from "../config/api.config";
import { JWTConfig, logoutUser } from "../utils/helper";
import type { ApiResult, ReturnProject } from "../types";

const authenticatedRequest = async <T>(
  method: "GET" | "POST" | "PUT",
  url: string,
  data?: unknown,
  extraHeaders?: Record<string, string>,
): Promise<ApiResult<T>> => {
  try {
    const { headers } = await JWTConfig(extraHeaders);
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

export const uploadFileApi = (formData: FormData) =>
  authenticatedRequest<{ files: string[] }>(
    "POST",
    API_ENDPOINTS.UPLOAD_FILE,
    formData,
    { "Content-Type": "multipart/form-data" },
  );

export const createProjectApi = (payload: {
  projectNumber: string;
  projectName: string;
  projectDescription?: string;
  shapeFileName: string;
}) =>
  authenticatedRequest<unknown>(
    "POST",
    API_ENDPOINTS.CREATE_PROJECT,
    payload,
  );

export const getProjectByIdApi = (projectId: number) =>
  authenticatedRequest<{
    projectId: number;
    projectNumber: string;
    projectName: string;
    projectDescription?: string;
    kmlFileUrl?: string;
    geoJsonFileUrl?: string;
  }>(
    "GET",
    `${API_ENDPOINTS.GET_PROJECT_BY_ID}?projectId=${projectId}`,
  );

export const getCollectorCodeApi = (projectId: number) =>
  authenticatedRequest<{ projectId: number; collectorCode: string }>(
    "GET",
    `${API_ENDPOINTS.GET_COLLECTOR_CODE}?projectId=${projectId}`,
  );

export const updateProjectApi = (payload: {
  projectId: number;
  projectName?: string;
  projectDescription?: string;
  shapeFileName?: string;
  isLocked?: boolean;
  isDownloaded?: boolean;
}) =>
  authenticatedRequest<{
    kmlFileUrl?: string;
    geoJsonFileUrl?: string;
    projectName?: string;
    projectDescription?: string;
  }>("PUT", API_ENDPOINTS.UPDATE_PROJECT, payload);
