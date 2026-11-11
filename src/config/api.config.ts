export const API_ENDPOINTS = {
  SIGN_IN: "/auth/signin",
  SIGN_UP: "/auth/signup",
  CHECK_DOMAIN: "/auth/check-domain",
  CONFIRM_SIGN_UP: "/auth/confirm-sign-up",
  RESEND_CODE: "/auth/resend-code",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/confirm-forgot-password",
  REFRESH_TOKEN: "/auth/refresh-token",
  PROFILE: "/users/me",
  CHANGE_PASSWORD: "/auth/change-password",
  GET_ASSIGNED_PROJECT: "/project/get-assigned-project",
  ASSIGN_DEMO_PROJECT: "/auth/assign-demo-project",
} as const;
