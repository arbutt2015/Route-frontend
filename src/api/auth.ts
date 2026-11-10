import { request } from "./http.service";
import { API_ENDPOINTS } from "../config/api.config";
import type {
  LoginCredentials,
  LoginData,
  RefreshTokenData,
  RegistrationPayload,
} from "../types";

export const loginAPI = (payload: LoginCredentials) =>
  request<LoginData>("POST", API_ENDPOINTS.SIGN_IN, payload);

export const registerAPI = (payload: RegistrationPayload) =>
  request("POST", API_ENDPOINTS.SIGN_UP, payload);

export const verifyEmailAPI = (email: string) =>
  request<{ shouldBeVerified: boolean }>("POST", API_ENDPOINTS.CHECK_DOMAIN, {
    email,
  });

export const verificationCodeAPI = (payload: {
  email: string;
  confirmationCode: string;
}) => request("POST", API_ENDPOINTS.CONFIRM_SIGN_UP, payload);

export const reSendVerificationCodeAPI = (payload: { email: string }) =>
  request("POST", API_ENDPOINTS.RESEND_CODE, payload);

export const requestPasswordReset = (payload: { email: string }) =>
  request("POST", API_ENDPOINTS.FORGOT_PASSWORD, payload);

export const resetPasswordAPI = (payload: {
  email: string;
  confirmationCode: string;
  newPassword: string;
}) => request("PUT", API_ENDPOINTS.RESET_PASSWORD, payload);

export const refreshTokenAPI = (payload: { refreshToken: string }) =>
  request<RefreshTokenData>("POST", API_ENDPOINTS.REFRESH_TOKEN, payload);
