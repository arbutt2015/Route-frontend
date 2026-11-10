/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { ApiResponseType, ApiFunctionReturnType, IPApiResponseType, IAgentRequestPayload } from "../types";
import { JWTConfig, parseErrors } from "../utils/helper";
import { headersJSON } from "../config/api.config";

export const get = async (url: string, headers: Record<string, any> = headersJSON): Promise<ApiFunctionReturnType> => {
  try {
    const res: ApiResponseType = await axios.get(url, await JWTConfig(headers));
    return {
      success: res.data.success,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error: any) {
    return parseErrors(error?.response ?? "");
  }
};

export const getIP = async (url: string): Promise<any> => {
  try {
    const res: IPApiResponseType = await axios.get(url);
    if (res?.status === 200) {
      return {
        success: true,
        data: res.data,
        message: "",
      };
    }
    return {
      success: false,
      data: null,
      message: "Internal server error.",
    };
  } catch (error: any) {
    return parseErrors(error?.response ?? "");
  }
};

export const getById = async (
  url: string,
  id: string | number,
  headers: Record<string, any> = headersJSON,
): Promise<ApiFunctionReturnType> => {
  try {
    const res: ApiResponseType = await axios.get(`${url}/${id}`, await JWTConfig(headers));

    return {
      success: res.data.success,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error: any) {
    return parseErrors(error?.response ?? "");
  }
};

export const create = async (
  url: string,
  data: Record<any, any>,
  headers: Record<string, any> = headersJSON,
  isAuthenticated = true,
): Promise<ApiFunctionReturnType> => {
  try {
    let res = null;
    if (isAuthenticated) {
      res = await axios.post(url, data, await JWTConfig(headers));
    } else {
      res = await axios.post(url, data, { headers });
    }
    return {
      success: res.data.success,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error: any) {
    return parseErrors(error?.response ?? "");
  }
};

export const update = async (
  url: string,
  id: string | number,
  data: Record<any, any>,
  headers: Record<string, any> = headersJSON,
): Promise<ApiFunctionReturnType> => {
  try {
    const response: ApiResponseType = await axios.put(`${url}/${id}`, data, await JWTConfig(headers));

    return {
      success: response.data.success,
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error: any) {
    return parseErrors(error?.response ?? "");
  }
};
export const patchUpdate = async (
  url: string,
  id: string | number,
  data: Record<any, any>,
  headers: Record<string, any> = headersJSON,
): Promise<ApiFunctionReturnType> => {
  try {
    const response: ApiResponseType = await axios.patch(`${url}/${id}`, data, await JWTConfig(headers));

    return {
      success: response.data.success,
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error: any) {
    return parseErrors(error?.response ?? "");
  }
};

export const del = async (
  url: string,
  id: string | number,
  headers: Record<string, any> = headersJSON,
): Promise<ApiFunctionReturnType> => {
  try {
    const res: ApiResponseType = await axios.delete(`${url}/${id}`, await JWTConfig(headers));

    return {
      success: res.data.success,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error: any) {
    return parseErrors(error?.response ?? "");
  }
};

export const deleteData = async (
  url: string,
  body: any,
  headers: Record<string, any> = headersJSON,
): Promise<ApiFunctionReturnType> => {
  try {
    const result = await JWTConfig(headers);
    const res: ApiResponseType = await axios.delete(url, {
      ...result,
      data: body,
    });

    return {
      success: res.data.success,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error: any) {
    return parseErrors(error?.response ?? "");
  }
};

export const verifyEmail = async (
  url: string,
  email: string,
  headers: Record<string, any> = headersJSON,
): Promise<ApiFunctionReturnType> => {
  try {
    const res: ApiResponseType = await axios.post(
      url,
      { email },
      {
        headers,
      },
    );

    if (!res.data.success) {
      return {
        success: false,
        data: null,
        message: res?.data?.message ?? "An error occurred while processing your request.",
      };
    }
    return {
      success: res.data.success,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error: any) {
    return parseErrors(error?.response ?? "");
  }
};

export const resetPassword = async (
  url: string,
  data: Record<any, any>,
  headers: Record<string, any> = headersJSON,
): Promise<ApiFunctionReturnType> => {
  try {
    const response: ApiResponseType = await axios.put(url, data, {
      headers,
    });

    return {
      success: response.data.success,
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error: any) {
    return parseErrors(error?.response ?? "");
  }
};

export const getByQueryStringId = async (
  url: string,
  id: string | number,
  field: string,
  headers: Record<string, any> = headersJSON,
): Promise<ApiFunctionReturnType> => {
  try {
    const res: ApiResponseType = await axios.get(`${url}?${field}=${id}`, await JWTConfig(headers));

    return {
      success: res.data.success,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error: any) {
    return parseErrors(error?.response ?? "");
  }
};

export const getByQueryString = async (
  url: string,
  params: any,
  headers: Record<string, any> = headersJSON,
): Promise<ApiFunctionReturnType> => {
  try {
    // Construct the query string from params object
    const queryString = Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join("&");
    const res: ApiResponseType = await axios.get(`${url}?${queryString}`, await JWTConfig(headers));

    return {
      success: res.data.success,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error: any) {
    return parseErrors(error?.response ?? "");
  }
};

export const updateData = async (
  url: string,
  payload: any,
  headers: Record<string, string> = headersJSON,
): Promise<ApiFunctionReturnType> => {
  try {
    const res: ApiResponseType = await axios.put(`${url}`, payload, await JWTConfig(headers));

    return {
      success: res.data.success,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error: any) {
    return parseErrors(error?.response ?? "");
  }
};

export const patchUpdateData = async (
  url: string,
  payload: any,
  headers: Record<string, string>,
): Promise<ApiFunctionReturnType> => {
  try {
    const res: ApiResponseType = await axios.patch(`${url}`, payload, await JWTConfig(headers));

    return {
      success: res.data.success,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error: any) {
    return parseErrors(error?.response ?? "");
  }
};

export const getByMulQueryString = async (
  url: string,
  queryString: string,
  body?: Record<string, any>,
  headers: Record<string, any> = headersJSON,
  isPublic = false,
): Promise<ApiFunctionReturnType> => {
  try {
    const config = isPublic ? {} : await JWTConfig(headers);

    // Use POST if body is provided, otherwise GET
    const res: ApiResponseType = body
      ? await axios.post(`${url}?${queryString}`, body, config)
      : await axios.get(`${url}?${queryString}`, config);

    return {
      success: res.data.success,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error: any) {
    return parseErrors(error?.response ?? "");
  }
};

export const createByQueryString = async (
  url: string,
  params: any,
  headers: Record<string, any> = headersJSON,
): Promise<ApiFunctionReturnType> => {
  try {
    // Construct the query string from params object
    const queryString = Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join("&");
    const res: ApiResponseType = await axios.post(`${url}?${queryString}`, {
      ...(await JWTConfig(headers)),
      timeout: 120000,
    });

    return {
      success: res.data.success,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error: any) {
    return parseErrors(error?.response ?? "");
  }
};

export const createStream = async (
  url: string,
  data: IAgentRequestPayload,
  signal: AbortSignal,
  headers: Record<string, string> = headersJSON,
  isAuthenticated = true,
): Promise<Response | undefined> => {
  try {
    let finalHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...headers,
    };

    if (isAuthenticated) {
      const authHeaders = await JWTConfig(headers);
      if (authHeaders && typeof authHeaders === "object") {
        finalHeaders = {
          ...finalHeaders,
          ...authHeaders,
        };
      }
    }

    const response = await fetch(url, {
      method: "POST",
      headers: finalHeaders,
      body: JSON.stringify(data),
      signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return response;
  } catch (error: any) {
    console.error("❌ createStream error:", error?.message || error);
    return undefined;
  }
};

export const deleteByQueryString = async (
  url: string,
  params: any,
  headers: Record<string, any> = headersJSON,
): Promise<ApiFunctionReturnType> => {
  try {
    // Construct the query string from params object
    const queryString = Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join("&");
    const res: ApiResponseType = await axios.delete(`${url}?${queryString}`, {
      ...(await JWTConfig(headers)),
      timeout: 120000,
    });

    return {
      success: res.data.success,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error: any) {
    return parseErrors(error?.response ?? "");
  }
};
