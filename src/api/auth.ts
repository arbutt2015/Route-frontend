/* eslint-disable @typescript-eslint/no-explicit-any */
import { create, verifyEmail } from "./http.service";
import { ApiFunctionReturnType } from "../types";
import { API_ENDPOINTS } from "../utils/constant";
import { headersJSON } from "../config/api.config";
import { LoginForm } from "../types";
import { RegistrationForm } from "../types";
import { resetPassword } from "./http.service";

export const loginAPI = (payload: LoginForm): Promise<ApiFunctionReturnType> => {
  return create(API_ENDPOINTS.LOGIN_URL, payload, headersJSON, false);
};

export const registerAPI = (payload: RegistrationForm): Promise<ApiFunctionReturnType> => {
  return create(API_ENDPOINTS.REGISTRATION_URL, payload, headersJSON, false);
};

export const verifyEmailAPI = (email: string) => {
  return verifyEmail(API_ENDPOINTS.VERIFY_EMAIL_URL, email, headersJSON);
};

export const verificationCodeAPI = (payload: { email: string; confirmationCode: string }) => {
  return create(API_ENDPOINTS.CONFIRM_SIGN_UP, payload, headersJSON, false);
};

export const reSendVerificationCodeAPI = (payload: { email: string }) => {
  return create(API_ENDPOINTS.RESEND_VERIFICATION_CODE, payload, headersJSON, false);
};

export const requestPasswordReset = (payload: { email: string }) => {
  return create(API_ENDPOINTS.REQUEST_PASSWORD_RESET, payload, headersJSON, false);
};

export const resetPasswordAPI = (payload: { [key: string]: string }) => {
  return resetPassword(API_ENDPOINTS.RESET_PASSWORD, payload, headersJSON);
};

export const refreshTokenAPI = (payload: { [key: string]: string }) => {
  return create(API_ENDPOINTS.REFRESH_TOKEN, payload, headersJSON, false);
};
